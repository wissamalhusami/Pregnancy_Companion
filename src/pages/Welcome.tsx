import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAuth } from '../state/AuthContext';
import { BrandLockup } from '../components/Logo';
import { HeroArtwork } from '../components/Artwork';
import { Icon } from '../components/Icon';

/** Public first-run screen: explains the app and offers the two entry paths. */
export function Welcome() {
  const { t } = useLang();
  const { configured, user } = useAuth();

  const primaryTo = configured && !user ? '/auth/register' : '/setup';

  return (
    <div className="welcome">
      <header className="welcome-bar">
        <BrandLockup />
        <div className="welcome-bar-actions">
          <Link className="btn btn-ghost btn-sm" to="/danger-signs">
            <Icon name="alert" size={15} />
            {t('nav.danger')}
          </Link>
          {configured && !user ? (
            <Link className="btn btn-sm" to="/auth/login">
              {t('nav.signIn')}
            </Link>
          ) : (
            <Link className="btn btn-sm" to="/">
              {t('common.continue')}
            </Link>
          )}
        </div>
      </header>

      <main className="welcome-main">
        <section className="welcome-hero">
          <span className="eyebrow">{t('brand.eyebrow')}</span>
          <h1>{t('welcome.heroTitle')}</h1>
          <p className="welcome-sub">{t('welcome.heroSub')}</p>

          <ul className="welcome-points">
            <li>
              <span className="point-mark" aria-hidden="true">
                <Icon name="calendar" size={15} />
              </span>
              {t('welcome.point1')}
            </li>
            <li>
              <span className="point-mark" aria-hidden="true">
                <Icon name="activity" size={15} />
              </span>
              {t('welcome.point2')}
            </li>
            <li>
              <span className="point-mark" aria-hidden="true">
                <Icon name="shield" size={15} />
              </span>
              {t('welcome.point3')}
            </li>
          </ul>

          <div className="welcome-cta">
            <Link className="btn" to={primaryTo}>
              {t('welcome.start')}
              <Icon name="chevronLeft" size={16} className="cta-arrow" />
            </Link>
            <Link className="btn btn-ghost" to="/">
              {t('welcome.explore')}
            </Link>
          </div>

          <p className="welcome-trust">
            <Icon name="shield" size={14} />
            {t('welcome.trust')}
          </p>
        </section>

        <div className="welcome-art">
          <HeroArtwork />
        </div>
      </main>
    </div>
  );
}
