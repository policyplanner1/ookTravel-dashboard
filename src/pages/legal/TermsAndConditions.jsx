import LegalDocument from './LegalDocument';
import { TERMS_SECTIONS } from './legalContent';

export default function TermsAndConditions() {
  return (
    <LegalDocument
      title="Terms and Conditions"
      sections={TERMS_SECTIONS}
      notice="By using OOK Travel, you confirm that you have read and agree to these Terms and Conditions."
    />
  );
}
