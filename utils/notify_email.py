#!/usr/bin/env python3
"""Email a markdown file via the mail-gateway SMTP credentials.

Reuses the systemd-user mail-gateway service's Gmail app password file
(default /run/agenix/simplemail-gmail-app-password) so the scheduled
meetup-rollover task can mail a proposal to inbox. Stdlib only.

Env overrides:
    MAIL_GATEWAY_ADDRESS         — sender (default phylacterion@gmail.com)
    MAIL_GATEWAY_CREDENTIAL_PATH — gmail app password file
    LIGHT_MACHINES_RECIPIENT     — recipient (default timothy.n.jesionowski@gmail.com)

CLI:
    python utils/notify_email.py /tmp/meetup-rollover.md
    python utils/notify_email.py /tmp/meetup-rollover.md --dry-run
"""
from __future__ import annotations

import argparse
import os
import smtplib
import sys
from email.message import EmailMessage
from pathlib import Path

DEFAULT_SENDER = "phylacterion@gmail.com"
DEFAULT_RECIPIENT = "timothy.n.jesionowski@gmail.com"
DEFAULT_CREDENTIAL_PATH = "/run/agenix/simplemail-gmail-app-password"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_TIMEOUT = 30


def _first_h1(text: str) -> str | None:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return None


def send_digest(
    digest_path: Path,
    *,
    sender: str | None = None,
    recipient: str | None = None,
    credential_path: Path | None = None,
    subject_prefix: str = "",
    subject_override: str | None = None,
) -> str:
    sender = sender or os.environ.get("MAIL_GATEWAY_ADDRESS") or DEFAULT_SENDER
    recipient = recipient or os.environ.get("LIGHT_MACHINES_RECIPIENT") or DEFAULT_RECIPIENT
    cred = credential_path or Path(
        os.environ.get("MAIL_GATEWAY_CREDENTIAL_PATH") or DEFAULT_CREDENTIAL_PATH
    )

    body = digest_path.read_text(encoding="utf-8")
    subject = subject_override or _first_h1(body) or digest_path.stem
    if subject_prefix:
        subject = f"{subject_prefix}{subject}"

    password = cred.read_text().strip()

    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT) as smtp:
        smtp.login(sender, password)
        smtp.send_message(msg)

    return subject


def main() -> int:
    p = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    p.add_argument("digest", type=Path, help="Path to a markdown file to email")
    p.add_argument("--to", default=None, help=f"Recipient (default {DEFAULT_RECIPIENT})")
    p.add_argument("--from", dest="sender", default=None,
                   help=f"Sender (default {DEFAULT_SENDER})")
    p.add_argument("--subject", default=None,
                   help="Subject override (default: first H1 of body, else filename stem)")
    p.add_argument("--subject-prefix", default="",
                   help="Prepended to subject (e.g. '[light-machines] ')")
    p.add_argument("--dry-run", action="store_true",
                   help="Print envelope without sending")
    args = p.parse_args()

    if not args.digest.exists():
        print(f"ERROR: file not found: {args.digest}", file=sys.stderr)
        return 1

    body = args.digest.read_text(encoding="utf-8")
    subject = args.subject or _first_h1(body) or args.digest.stem
    if args.subject_prefix:
        subject = f"{args.subject_prefix}{subject}"

    if args.dry_run:
        print("[dry-run] would send:")
        print(f"  From: {args.sender or DEFAULT_SENDER}")
        print(f"  To:   {args.to or DEFAULT_RECIPIENT}")
        print(f"  Subj: {subject}")
        print(f"  Body: {len(body)} bytes")
        return 0

    send_digest(
        args.digest,
        sender=args.sender,
        recipient=args.to,
        subject_prefix=args.subject_prefix,
        subject_override=args.subject,
    )
    print(f"Sent: {args.digest.name} → {args.to or DEFAULT_RECIPIENT}")
    print(f"  Subject: {subject}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
