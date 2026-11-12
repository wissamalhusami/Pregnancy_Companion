import type { SourceRef } from './types';

/**
 * Sources behind the educational content. Only organisations with public,
 * citable guidance are listed (WHO, CDC, ACOG, NHS, AAP, UNICEF, NICE).
 */
export const refs: SourceRef[] = [
  {
    id: 'who-anc',
    title: 'WHO recommendations on antenatal care for a positive pregnancy experience',
    publisher: 'World Health Organization',
    year: '2016',
    url: 'https://www.who.int/publications/i/item/9789241549912',
  },
  {
    id: 'who-pnc',
    title: 'WHO recommendations on maternal and newborn care for a positive postnatal experience',
    publisher: 'World Health Organization',
    year: '2022',
    url: 'https://www.who.int/publications/i/item/9789240045989',
  },
  {
    id: 'who-preeclampsia',
    title: 'WHO recommendations for prevention and treatment of pre-eclampsia and eclampsia',
    publisher: 'World Health Organization',
    year: '2011',
    url: 'https://www.who.int/publications/i/item/9789241548335',
  },
  {
    id: 'who-newborn',
    title: 'WHO recommendations on newborn health: guidelines for care of the newborn',
    publisher: 'World Health Organization',
    year: '2017',
    url: 'https://www.who.int/publications/i/item/WHO-MCA-17.07',
  },
  {
    id: 'who-pph',
    title: 'WHO recommendations for the prevention and treatment of postpartum haemorrhage',
    publisher: 'World Health Organization',
    year: '2012',
    url: 'https://www.who.int/publications/i/item/9789241548502',
  },
  {
    id: 'who-bf',
    title: 'Infant and young child feeding: model chapter for textbooks',
    publisher: 'World Health Organization & UNICEF',
    year: '2009',
    url: 'https://www.who.int/publications/i/item/9789241597494',
  },
  {
    id: 'who-folic',
    title: 'Periconceptional folic acid supplementation to prevent neural tube defects',
    publisher: 'World Health Organization',
    year: '2023',
    url: 'https://www.who.int/publications/i/item/9789240073753',
  },
  {
    id: 'who-ppd',
    title: 'Maternal mental health and well-being: policy brief',
    publisher: 'World Health Organization',
    year: '2022',
    url: 'https://www.who.int/publications/i/item/9789240048751',
  },
  {
    id: 'cdc-pregnancy',
    title: 'Pregnancy: staying healthy and safe',
    publisher: 'Centers for Disease Control and Prevention',
    year: '2024',
    url: 'https://www.cdc.gov/pregnancy/',
  },
  {
    id: 'cdc-food',
    title: 'Food safety for pregnant women',
    publisher: 'Centers for Disease Control and Prevention',
    year: '2024',
    url: 'https://www.cdc.gov/food-safety/people-at-risk/pregnant-women.html',
  },
  {
    id: 'cdc-vaccines',
    title: 'Vaccines recommended during pregnancy',
    publisher: 'Centers for Disease Control and Prevention',
    year: '2024',
    url: 'https://www.cdc.gov/vaccines-pregnancy/',
  },
  {
    id: 'cdc-newborn-jaundice',
    title: 'Jaundice in newborns',
    publisher: 'Centers for Disease Control and Prevention',
    year: '2024',
    url: 'https://www.cdc.gov/newborn-jaundice/',
  },
  {
    id: 'acog-bp',
    title: 'ACOG Practice Bulletin 222: Gestational Hypertension and Preeclampsia',
    publisher: 'American College of Obstetricians and Gynecologists',
    year: '2020',
    url: 'https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2020/06/gestational-hypertension-and-preeclampsia',
  },
  {
    id: 'acog-postpartum',
    title: 'ACOG Committee Opinion 736: Optimizing Postpartum Care',
    publisher: 'American College of Obstetricians and Gynecologists',
    year: '2018',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care',
  },
  {
    id: 'acog-cesarean',
    title: 'ACOG Patient Education: Cesarean birth',
    publisher: 'American College of Obstetricians and Gynecologists',
    year: '2023',
    url: 'https://www.acog.org/womens-health/faqs/cesarean-birth',
  },
  {
    id: 'acog-labor',
    title: 'ACOG Patient Education: Labor and birth',
    publisher: 'American College of Obstetricians and Gynecologists',
    year: '2023',
    url: 'https://www.acog.org/womens-health/faqs/labor-and-birth',
  },
  {
    id: 'nice-fm',
    title: 'NICE guideline NG201: Antenatal care — reduced fetal movements',
    publisher: 'National Institute for Health and Care Excellence',
    year: '2021',
    url: 'https://www.nice.org.uk/guidance/ng201',
  },
  {
    id: 'nice-ppd',
    title: 'NICE guideline CG192: Antenatal and postnatal mental health',
    publisher: 'National Institute for Health and Care Excellence',
    year: '2020',
    url: 'https://www.nice.org.uk/guidance/cg192',
  },
  {
    id: 'nhs-pregnancy',
    title: 'NHS: Pregnancy and baby guide',
    publisher: 'National Health Service (UK)',
    year: '2024',
    url: 'https://www.nhs.uk/pregnancy/',
  },
  {
    id: 'nhs-labour',
    title: 'NHS: Signs that labour has begun',
    publisher: 'National Health Service (UK)',
    year: '2023',
    url: 'https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/signs-that-labour-has-begun/',
  },
  {
    id: 'nhs-breastfeeding',
    title: 'NHS: Breastfeeding and bottle feeding advice',
    publisher: 'National Health Service (UK)',
    year: '2023',
    url: 'https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/',
  },
  {
    id: 'aap-newborn',
    title: 'AAP: Newborn and infant care guidance',
    publisher: 'American Academy of Pediatrics',
    year: '2023',
    url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx',
  },
  {
    id: 'aap-sleep',
    title: 'AAP Task Force: Safe sleep for infants (2022 recommendations)',
    publisher: 'American Academy of Pediatrics',
    year: '2022',
    url: 'https://publications.aap.org/pediatrics/article/150/1/e2022057990/188395',
  },
  {
    id: 'aap-apgar',
    title: 'AAP: The Apgar score',
    publisher: 'American Academy of Pediatrics',
    year: '2015',
    url: 'https://publications.aap.org/pediatrics/article/136/4/819/33492',
  },
  {
    id: 'unicef-latch',
    title: 'Breastfeeding support: positioning and attachment guidance',
    publisher: 'UNICEF UK Baby Friendly Initiative',
    year: '2022',
    url: 'https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/',
  },
  {
    id: 'unicef-milk',
    title: 'Expressing and storing breast milk safely',
    publisher: 'UNICEF UK Baby Friendly Initiative',
    year: '2022',
    url: 'https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/',
  },
  {
    id: 'iom-gain',
    title: 'Weight Gain During Pregnancy: Reexamining the Guidelines',
    publisher: 'Institute of Medicine / National Academy of Medicine',
    year: '2009',
    url: 'https://nap.nationalacademies.org/catalog/12584/weight-gain-during-pregnancy-reexamining-the-guidelines',
  },
  {
    id: 'acog-preconception',
    title: 'ACOG Committee Opinion 762: Prepregnancy Counseling',
    publisher: 'American College of Obstetricians and Gynecologists',
    year: '2019',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2019/01/prepregnancy-counseling',
  },
  {
    id: 'cdc-contraception',
    title: 'US MEC: Contraceptive use during the postpartum period',
    publisher: 'Centers for Disease Control and Prevention',
    year: '2024',
    url: 'https://www.cdc.gov/contraception/hcp/usmec/',
  },
  {
    id: 'who-pph-care',
    title: 'WHO: Postpartum haemorrhage — prevention, diagnosis and management',
    publisher: 'World Health Organization',
    year: '2023',
    url: 'https://www.who.int/publications/i/item/9789240073722',
  },
];

const byId = new Map(refs.map((item) => [item.id, item]));

export function getRef(id: string): SourceRef | undefined {
  return byId.get(id);
}

/** Educational disclaimer shown on every article and in the footer. */
export const educationalDisclaimer = {
  ar: 'جميع محتويات التطبيق تعليمية وتوعوية لمشروع جامعي في تمريض النساء والتوليد، ولا تُعد تشخيصاً طبياً ولا بديلاً عن استشارة الطبيب أو القابلة. في حال وجود علامة خطر، اطلبي الرعاية الطبية فوراً.',
  en: 'All content in this application is educational, produced for a university Gynecology and Maternity Nursing project. It is not a medical diagnosis and does not replace advice from a doctor or midwife. If you have a danger sign, seek medical care immediately.',
};

/** Content review month shown in the library and on each article. */
export const CONTENT_REVIEWED = '2026-11';
