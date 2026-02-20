import { useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import type { Partner, Classification } from '../types/partner';
import type { DetailPanelView } from '../types/detail-panel';

export function useDetailPanel() {
  const { state, dispatch } = useDashboard();

  const openPartner = useCallback(
    (partner: Partner) => {
      dispatch({ type: 'OPEN_DETAIL_PANEL', view: { kind: 'partner', partner } });
    },
    [dispatch],
  );

  const openClassification = useCallback(
    (classification: Classification, partners: Partner[]) => {
      dispatch({ type: 'OPEN_DETAIL_PANEL', view: { kind: 'classification', classification, partners } });
    },
    [dispatch],
  );

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE_DETAIL_PANEL' });
  }, [dispatch]);

  return {
    view: state.detailPanel as DetailPanelView,
    isOpen: state.detailPanel !== null,
    openPartner,
    openClassification,
    close,
  };
}
