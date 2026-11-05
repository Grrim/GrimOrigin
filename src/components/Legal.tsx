import { useEffect, type ReactNode } from 'react';
import { TOKENS, TYPE } from '../tokens';

export function LegalModal({ kind, onClose }: { kind: 'privacy' | 'terms' | null; onClose: () => void }) {
  useEffect(() => {
    if (!kind) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [kind, onClose]);

  const open = kind !== null;
  const title = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const updated = 'May 2026';

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,9,12,0.72)',
          backdropFilter: open ? 'blur(8px)' : 'blur(0px)',
          WebkitBackdropFilter: open ? 'blur(8px)' : 'blur(0px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `opacity 400ms ${TOKENS.ease}, backdrop-filter 400ms ${TOKENS.ease}`,
          zIndex: 100,
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.96)',
          width: 'min(720px, calc(100vw - 32px))',
          maxHeight: 'min(80vh, 800px)',
          background: TOKENS.surfaceDeep,
          border: `1px solid ${TOKENS.borderSoft}`,
          borderRadius: '20px',
          boxShadow: open ? '0 24px 80px rgba(0,0,0,0.60)' : 'none',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `opacity 400ms ${TOKENS.ease}, transform 400ms ${TOKENS.easeOutExpo}`,
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: 'clamp(20px, 2vw + 8px, 32px) clamp(24px, 2.5vw + 8px, 40px)', borderBottom: `1px solid ${TOKENS.borderSoft}` }}>
          <div>
            <span style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: TOKENS.textDim, display: 'block', marginBottom: '6px' }}>Last updated · {updated}</span>
            <h2 style={{ fontSize: 'clamp(20px, 1.5vw + 12px, 26px)', fontWeight: 600, letterSpacing: '-0.015em', color: TOKENS.textHigh, margin: 0 }}>{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: TOKENS.textMute, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: `background 200ms ${TOKENS.ease}, color 200ms ${TOKENS.ease}` }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.color = TOKENS.textHigh; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = TOKENS.textMute; }}>✕</button>
        </header>
        <div data-lenis-prevent style={{ overflow: 'auto', overscrollBehavior: 'contain', padding: 'clamp(20px, 2vw + 8px, 32px) clamp(24px, 2.5vw + 8px, 40px)', flex: 1 }}>
          {kind === 'privacy' ? <PrivacyContent /> : kind === 'terms' ? <TermsContent /> : null}
        </div>
      </aside>
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 'clamp(20px, 2vw, 28px)' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, color: TOKENS.textHigh, letterSpacing: '-0.01em', margin: '0 0 8px' }}>{title}</h3>
      <div style={{ fontSize: '14px', lineHeight: 1.7, color: TOKENS.textMute }}>{children}</div>
    </section>
  );
}

function PrivacyContent() {
  return (
    <div>
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: TOKENS.textMute, marginTop: 0 }}>
        Grim Origin (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a sole-proprietor indie studio based in Poland. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website (grrim.github.io/GrimOrigin) or use our mobile applications, including LUMINIS, Luna, and OFFLINE (collectively, the &quot;Services&quot;). We are committed to data minimization and full compliance with the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), the Children&apos;s Online Privacy Protection Act (COPPA), and the Google Play User Data Policy.
      </p>

      <LegalSection title="1. Data Controller">
        The data controller responsible for processing your personal data is Grim Origin, contactable at <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>. As a sole-proprietor studio in the EU, we do not have a separate Data Protection Officer, but the founder personally handles all privacy inquiries.
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p style={{ margin: '0 0 8px' }}><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Website.</strong> Our website does not use analytics, advertising trackers, or third-party cookies. Standard server logs maintained by GitHub Pages (our hosting provider) may temporarily record IP address, user agent, and timestamps for security and abuse prevention; we do not access or retain these logs.</p>
        <p style={{ margin: '0 0 8px' }}><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Apps.</strong> Our apps are privacy-first. Personal data such as preferences, progress, health entries (Luna), and screen-time logs (OFFLINE) is stored locally on your device by default. We collect:</p>
        <ul style={{ margin: '0 0 8px', paddingLeft: '20px' }}>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Account data</strong> (only if you create one): email address, hashed password, display name.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Crash and diagnostic data</strong>: anonymized crash reports, device model, OS version, app version. Used to fix bugs.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Purchase data</strong>: handled by Google Play / App Store; we receive only confirmation of entitlement, never card details.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>In-app health entries (Luna)</strong>: cycle dates, symptoms, mood. Stored on-device and, if you opt-in to backup, end-to-end encrypted in your own cloud account.</li>
        </ul>
        <p style={{ margin: 0 }}><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Email correspondence.</strong> When you email us, we retain the message and your email address for as long as needed to respond.</p>
      </LegalSection>

      <LegalSection title="3. Sensitive Data and Health Information">
        Luna may process information about menstrual cycles and reproductive health, which is considered sensitive personal data under GDPR Article 9 and special-category data in many jurisdictions. We process this data exclusively on the legal basis of your <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>explicit consent</strong>. You can withdraw consent and delete all data at any time within the app. We do not share, sell, or use sensitive data for advertising under any circumstances.
      </LegalSection>

      <LegalSection title="4. How We Use Your Information">
        We use personal information to: (a) provide, maintain, and improve the Services; (b) deliver in-app content and updates; (c) process purchases and verify entitlements; (d) respond to support requests; (e) detect, prevent, and address technical issues, fraud, or abuse; (f) comply with legal obligations. We do not use your data for behavioral advertising or to build user profiles for sale.
      </LegalSection>

      <LegalSection title="5. Legal Bases (GDPR)">
        We process personal data on the following bases: <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>consent</strong> (Art. 6(1)(a)) for optional features, analytics, and sensitive data; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>contract</strong> (Art. 6(1)(b)) for account features and purchases; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>legitimate interests</strong> (Art. 6(1)(f)) for crash diagnostics and security, balanced against your rights; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>legal obligation</strong> (Art. 6(1)(c)) for tax and consumer-protection records.
      </LegalSection>

      <LegalSection title="6. Sharing and Third-Party Services">
        We do not sell personal data. We share limited data only with service providers acting as processors under our instructions:
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Google Play / Apple App Store</strong> — app distribution, in-app purchases, subscription management.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Crash reporting (e.g., Firebase Crashlytics or Sentry)</strong> — anonymized stack traces and device metadata. No personal content.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Cloud hosting (e.g., Cloudflare, GitHub Pages)</strong> — infrastructure for our website.</li>
        </ul>
        Each provider has its own privacy policy that governs their handling of data. We do not disclose data to advertisers or data brokers. We may disclose data when required by law, court order, or to protect rights and safety.
      </LegalSection>

      <LegalSection title="7. International Transfers">
        Some processors may operate outside the European Economic Area. When transferring personal data internationally, we rely on EU Standard Contractual Clauses (SCCs), adequacy decisions, or other safeguards as required by GDPR Chapter V.
      </LegalSection>

      <LegalSection title="8. Data Retention">
        We retain personal data only as long as necessary for the purposes described, or as required by law. Account data is kept until you delete your account; crash logs are retained for up to 90 days; email correspondence is kept up to 2 years unless required longer for tax or legal purposes. Locally-stored data persists on your device until you delete the app or clear its data.
      </LegalSection>

      <LegalSection title="9. Your Rights">
        Depending on your jurisdiction, you have the right to: <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>access</strong> your personal data; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>rectify</strong> inaccurate data; request <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>erasure</strong> (&quot;right to be forgotten&quot;); restrict or object to processing; receive a portable copy of your data; withdraw consent at any time; lodge a complaint with a supervisory authority (in Poland: <em>Prezes UODO</em>, <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>uodo.gov.pl</a>). California residents additionally have the right to know, delete, correct, and opt out of sale of personal information under the CCPA/CPRA — we do not sell personal information. To exercise any right, email <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>; we respond within 30 days.
      </LegalSection>

      <LegalSection title="10. Children's Privacy">
        Our Services are not directed to children under 13 (or 16 in the EEA, where applicable). We do not knowingly collect personal information from children. If you believe a child has provided us personal data, contact us and we will delete it promptly. Apps targeted at general audiences participate in Google Play&apos;s Designed for Families program guidelines where applicable.
      </LegalSection>

      <LegalSection title="11. Security">
        We use technically and organizationally appropriate measures to protect personal data, including HTTPS/TLS encryption in transit, encryption at rest where supported, principle of least privilege for access to operational systems, and regular review of dependencies. No method of transmission or storage is 100% secure.
      </LegalSection>

      <LegalSection title="12. Permissions Used by Our Apps">
        Our apps may request the following Android/iOS permissions, only when needed for a feature you use: <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Notifications</strong> (reminders, in Luna and OFFLINE); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Storage</strong> (export/import of your data); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Internet</strong> (sync and updates); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Vibration</strong> (haptic feedback in LUMINIS); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Usage Stats</strong> (OFFLINE — only if you enable digital-detox tracking, with prominent in-app disclosure).
      </LegalSection>

      <LegalSection title="13. Changes to This Policy">
        We may update this Privacy Policy occasionally. Material changes will be communicated via in-app notice or by updating the &quot;Last updated&quot; date at the top of this document. Continued use of the Services after changes constitutes acceptance.
      </LegalSection>

      <LegalSection title="14. Contact">
        For privacy questions, complaints, or to exercise your rights, contact: <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>. Postal correspondence on request.
      </LegalSection>
    </div>
  );
}

function TermsContent() {
  return (
    <div>
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: TOKENS.textMute, marginTop: 0 }}>
        These Terms of Service (&quot;Terms&quot;) are a legally binding agreement between you and Grim Origin (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), a sole-proprietor indie studio based in Poland. They govern your access to and use of our website (grrim.github.io/GrimOrigin) and our mobile applications, including LUMINIS, Luna, and OFFLINE (collectively, the &quot;Services&quot;). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.
      </p>

      <LegalSection title="1. Eligibility">
        You must be at least 13 years old (or 16 in the EEA, where applicable) to use our Services. If you are under the age of legal majority in your jurisdiction, you may use the Services only with consent from a parent or legal guardian. By using the Services, you represent that you meet these requirements and that the information you provide is accurate.
      </LegalSection>

      <LegalSection title="2. License Grant">
        Subject to your compliance with these Terms, we grant you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable license to download, install, and use our apps on devices you own or control, solely for personal, non-commercial purposes. Apps obtained via the Google Play Store or Apple App Store are also governed by the applicable end-user license agreement of that platform.
      </LegalSection>

      <LegalSection title="3. Restrictions">
        You agree not to, and not to permit others to: (a) reverse engineer, decompile, disassemble, or attempt to derive source code, except as expressly permitted by law; (b) modify, adapt, translate, or create derivative works of the Services; (c) remove or alter any proprietary notices; (d) rent, lease, lend, sell, redistribute, or sublicense the Services; (e) use the Services to violate any law, infringe rights, transmit malware, or interfere with other users; (f) use automated means to scrape or extract data from our website; (g) bypass technical protection measures or access controls; (h) impersonate any person or misrepresent your affiliation.
      </LegalSection>

      <LegalSection title="4. User Content">
        Some apps allow you to create or store content (e.g., notes, health entries, scores). You retain all rights to the content you create. By submitting content to a feature that publishes or shares it (such as a leaderboard or feedback form), you grant us a worldwide, royalty-free, non-exclusive license to host, store, transmit, and display that content for the purpose of operating the relevant feature. You are responsible for the legality of content you submit, and you must not upload content that is illegal, infringing, defamatory, hateful, sexually explicit, or harmful to minors.
      </LegalSection>

      <LegalSection title="5. Purchases, Subscriptions, and Refunds">
        Some apps offer paid features, in-app purchases, or subscriptions. All purchases are processed by the platform store (Google Play or Apple App Store) and are subject to that platform&apos;s payment terms. Subscriptions auto-renew unless canceled at least 24 hours before the renewal date through your platform account settings. Refund requests are governed by the platform&apos;s refund policy: <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>Google Play refund policy</a> or <a href="https://support.apple.com/en-us/HT204084" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>App Store refund policy</a>. EU consumers retain their statutory right of withdrawal where applicable; some digital content begins performance immediately, and you waive the right of withdrawal upon download where the law permits.
      </LegalSection>

      <LegalSection title="6. Updates and Service Changes">
        We may issue updates, patches, and new versions automatically or at your request. We may add, modify, or remove features at any time. We may also suspend or discontinue the Services, in whole or part, with reasonable notice. We are not liable to you or third parties for any modification, suspension, or discontinuance of the Services.
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        All rights, title, and interest in the Services, including software, design, source code, graphics, audio, trademarks, logos, and the names &quot;Grim Origin&quot;, &quot;LUMINIS&quot;, &quot;Luna&quot;, and &quot;OFFLINE&quot;, are owned by Grim Origin or its licensors and are protected by intellectual-property laws. These Terms grant you no rights other than the limited license in Section 2. All other rights are reserved.
      </LegalSection>

      <LegalSection title="8. Third-Party Services">
        The Services may contain links to or integrate with third-party services (e.g., platform stores, cloud providers). We are not responsible for the content, policies, or practices of third parties. Your use of third-party services is at your own risk and subject to their terms and policies.
      </LegalSection>

      <LegalSection title="9. Privacy">
        Use of the Services is subject to our <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Privacy Policy</strong>, which is incorporated by reference into these Terms. By using the Services you acknowledge the privacy practices described there.
      </LegalSection>

      <LegalSection title="10. Disclaimer of Warranties">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, OR UNINTERRUPTED OPERATION. Some apps (especially Luna) provide informational content related to health and wellness; this content is not medical advice and is not a substitute for consultation with a qualified healthcare professional. Statutory consumer rights are not affected.
      </LegalSection>

      <LegalSection title="11. Limitation of Liability">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, GRIM ORIGIN SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES. OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIM RELATING TO THE SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) EUR 50. NOTHING IN THESE TERMS LIMITS LIABILITY FOR FRAUD, GROSS NEGLIGENCE, OR ANY LIABILITY THAT CANNOT BE LAWFULLY EXCLUDED.
      </LegalSection>

      <LegalSection title="12. Indemnity">
        You agree to indemnify and hold Grim Origin harmless from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from: (a) your use of the Services in violation of these Terms; (b) your user content; or (c) your violation of any law or third-party right.
      </LegalSection>

      <LegalSection title="13. Termination">
        We may suspend or terminate your access to the Services at any time, with or without notice, for breach of these Terms or any conduct we determine to be harmful. Upon termination, the licenses granted to you cease immediately, but Sections 7 (IP), 10 (Disclaimer), 11 (Limitation), 12 (Indemnity), and 14 (Governing Law) survive.
      </LegalSection>

      <LegalSection title="14. Governing Law and Jurisdiction">
        These Terms are governed by the laws of the Republic of Poland, without regard to conflict-of-law principles. Disputes will be submitted to the competent Polish courts. If you are a consumer, mandatory protections under the law of your country of residence (including the EU consumer-protection directives) remain available to you, and you may bring proceedings in your local courts. EU consumers may also access the European Commission&apos;s Online Dispute Resolution platform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>ec.europa.eu/consumers/odr</a>.
      </LegalSection>

      <LegalSection title="15. Changes to These Terms">
        We may revise these Terms occasionally. Material changes will be communicated via in-app notice or by updating the &quot;Last updated&quot; date. Continued use after changes become effective constitutes acceptance of the revised Terms. If you do not agree, you must stop using the Services.
      </LegalSection>

      <LegalSection title="16. Miscellaneous">
        These Terms (with the Privacy Policy) form the entire agreement between you and Grim Origin regarding the Services and supersede prior agreements on the same subject. If any provision is held unenforceable, the remaining provisions remain in effect. Our failure to enforce a right is not a waiver. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets.
      </LegalSection>

      <LegalSection title="17. Contact">
        Questions about these Terms? Email <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>. Postal correspondence on request.
      </LegalSection>
    </div>
  );
}
