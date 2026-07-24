import LegalDocument from './LegalDocument';
import { PRIVACY_SECTIONS } from './legalContent';

export default function PrivacyPolicy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      sections={PRIVACY_SECTIONS}
      notice="By using OOK Travel, you confirm that you have read and understood our Privacy Policy."
    />
  );
}
