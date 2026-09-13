// Security and anti-fraud email validation helper

// Comprehensive blacklist of known disposable, temporary, and throwaway email providers
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  '10minutemail.net',
  'tempmail.com',
  'temp-mail.org',
  'tempmail.net',
  'guerrillamail.com',
  'guerrillamail.block',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'sharklasers.com',
  'grr.la',
  'throwawaymail.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'cool.fr.nf',
  'jetable.fr.nf',
  'nospam.ze.tc',
  'nomail.xl.cx',
  'mega.zik.dj',
  'speed.1s.fr',
  'courriel.fr.nf',
  'moncourrier.fr.nf',
  'monemail.fr.nf',
  'monmail.fr.nf',
  'dispostable.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.org',
  'trashmail.me',
  'trashmail.ws',
  'burnermail.io',
  'fakeinbox.com',
  'getairmail.com',
  'mohmal.com',
  'crazymailing.com',
  'generator.email',
  'emailondeck.com',
  'mytemp.email',
  'nada.ltd',
  'getnada.com',
  'inboxkitten.com',
  'tempail.com',
  'tempinbox.com',
  'disposablemail.com',
  'maildrop.cc',
  'harakirimail.com',
  'fakemailgenerator.com',
  'zillamail.com',
  'spambox.us',
  'mintemail.com',
  'mytrashmail.com',
  'meltmail.com',
  'kasmail.com',
  'incognitomail.org',
  'spamgourmet.com',
  'deadaddress.com',
  'mailcatch.com',
  'fastmail.fm',
  'instantemailaddress.com',
  'dayrep.com',
  'teleworm.us',
  'superrito.com',
  'rhyta.com',
  'jourrapide.com',
  'gustr.com',
  'fleckens.hu',
  'cuvox.de',
  'armyspy.com',
  'einrot.com',
  'throwam.com',
  'mailfa.org'
]);

/**
 * Validates if an email is well-formed and not a disposable / temporary address.
 */
export function validateEmailSecurity(email: string): { isValid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase();
  
  if (!trimmed) {
    return { isValid: false, error: 'Please enter an email address.' };
  }

  // RFC 5322 standard email regex test
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid, well-formed email address.' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid email format.' };
  }

  const domain = parts[1].toLowerCase();

  // Check against known disposable domains
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: `Disposable & temporary email addresses (@${domain}) are blocked for security. Please provide a verified corporate or personal email.`
    };
  }

  // Check subdomains of disposable domains
  for (const disposable of DISPOSABLE_EMAIL_DOMAINS) {
    if (domain.endsWith('.' + disposable)) {
      return {
        isValid: false,
        error: `Disposable & temporary email addresses (@${domain}) are blocked for security. Please provide a verified corporate or personal email.`
      };
    }
  }

  return { isValid: true };
}
