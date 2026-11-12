import { useLang } from '../i18n';
import { useAuth } from '../state/AuthContext';
import { useAppState } from '../state/AppState';
import { Icon } from './Icon';

/**
 * Compact status chip: proves where the record currently lives.
 * Local writes are already durable in IndexedDB, so a failed cloud sync is
 * reported as a warning with a retry, never as data loss.
 */
export function SyncBadge() {
  const { t } = useLang();
  const { configured, user } = useAuth();
  const { sync, storage } = useAppState();

  if (!configured || !user) return null;

  const lastSyncLabel = sync.lastSyncedAt
    ? new Date(sync.lastSyncedAt).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  if (storage.error) {
    return (
      <span className="chip chip-warn sync-chip" role="status" title={t('storage.unavailable')}>
        <Icon name="alert" size={13} />
        {t('storage.memoryOnly')}
      </span>
    );
  }

  const tone =
    sync.status === 'saved'
      ? 'ok'
      : sync.status === 'syncing'
        ? 'busy'
        : sync.status === 'offline'
          ? 'warn'
          : sync.status === 'error'
            ? 'danger'
            : 'soft';

  const label =
    sync.status === 'saved'
      ? t('sync.saved')
      : sync.status === 'syncing'
        ? t('sync.syncing')
        : sync.status === 'offline'
          ? t('sync.offline')
          : sync.status === 'error'
            ? t('sync.errorShort')
            : t('sync.localOnly');

  const detail =
    sync.status === 'saved' && lastSyncLabel
      ? `${t('sync.saved')} · ${lastSyncLabel}`
      : sync.errorKey
        ? t(sync.errorKey)
        : t('sync.saved');

  const canRetry = sync.status === 'offline' || sync.status === 'error';

  return (
    <span className={`chip sync-chip sync-${tone}`} role="status" title={detail}>
      <Icon name={canRetry ? 'alert' : 'shield'} size={13} />
      <span className="sync-chip-label">{label}</span>
      {canRetry && (
        <button type="button" className="sync-retry" onClick={sync.retry}>
          {t('sync.retry')}
        </button>
      )}
    </span>
  );
}
