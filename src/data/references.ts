export interface Reference {
  id: string;
  title: string;
  publisher: string;
  year: string;
}

/**
 * Sources used for the educational content. Kept short and verifiable so the
 * project can be defended academically.
 */
export const references: Reference[] = [
  {
    id: 'who-anc',
    title: 'WHO recommendations on antenatal care for a positive pregnancy experience',
    publisher: 'World Health Organization',
    year: '2016',
  },
  {
    id: 'who-pnc',
    title: 'WHO recommendations on maternal and newborn care for a positive postnatal experience',
    publisher: 'World Health Organization',
    year: '2022',
  },
  {
    id: 'who-bf',
    title: 'Breastfeeding advocacy initiative / Infant and young child feeding guidance',
    publisher: 'World Health Organization & UNICEF',
    year: '2023',
  },
  {
    id: 'acog-bp',
    title: 'ACOG Practice Bulletin: Gestational Hypertension and Preeclampsia',
    publisher: 'American College of Obstetricians and Gynecologists',
    year: '2020',
  },
  {
    id: 'iom-gain',
    title: 'Weight Gain During Pregnancy: Reexamining the Guidelines',
    publisher: 'Institute of Medicine / National Academy of Medicine',
    year: '2009',
  },
  {
    id: 'nice-fm',
    title: 'Antenatal care (NICE guideline NG201) — reduced fetal movements',
    publisher: 'National Institute for Health and Care Excellence',
    year: '2021',
  },
  {
    id: 'cdc-food',
    title: 'Food safety for pregnant women',
    publisher: 'Centers for Disease Control and Prevention',
    year: '2024',
  },
  {
    id: 'unicef-latch',
    title: 'Breastfeeding support: positioning and attachment guidance',
    publisher: 'UNICEF UK Baby Friendly Initiative',
    year: '2022',
  },
];

export const educationalDisclaimer = {
  ar: 'جميع محتويات التطبيق تعليمية وتوعوية لمشروع جامعي في تمريض النساء والتوليد، ولا تُعد تشخيصاً طبياً ولا بديلاً عن استشارة الطبيب أو القابلة. في حال وجود علامة خطر، اطلبي الرعاية الطبية فوراً.',
  en: 'All content in this application is educational, produced for a university Gynecology and Maternity Nursing project. It is not a medical diagnosis and does not replace advice from a doctor or midwife. If you have a danger sign, seek medical care immediately.',
};
