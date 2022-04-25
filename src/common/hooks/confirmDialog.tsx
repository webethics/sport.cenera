import React, { useState, useCallback } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { makeStyles } from '@material-ui/core';

import buttonStyle from '@cenera/components/Button/buttonStyle';

const useStyles = makeStyles(buttonStyle as any);

type Props = {
  onDeleteConfirmed: (...data: any) => void;
  confirmMessage?: string;
  successMessage?: string;
  confirmText?: string;
  cancelText?: string;
  showOKButtonAfterSuccess?: boolean;
};

export const useShowConfirmDialog = ({
  onDeleteConfirmed,
  successMessage,
  confirmMessage,
  confirmText,
  cancelText,
  showOKButtonAfterSuccess,
}: Props) => {
  const [alert, setAlert] = useState(null);
  const classes = useStyles();

  const showSuccessMessage = useCallback(() => {
    setAlert(
      <SweetAlert
        success={true}
        style={{ display: 'block' }}
        title="Deleted!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnCssClass={classes.button + ' ' + classes.success}
        showConfirm={showOKButtonAfterSuccess !== undefined ? showOKButtonAfterSuccess : true}>
        {successMessage || 'Successfully deleted!'}
      </SweetAlert>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage]);

  const showConfirmDialog = useCallback(
    (...data: any) => {
      setAlert(
        <SweetAlert
          warning={true}
          style={{ display: 'block' }}
          title="Are you sure?"
          onConfirm={() => {
            onDeleteConfirmed([...data]);
            setAlert(null);
          }}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
          cancelBtnCssClass={classes.button + ' ' + classes.danger}
          confirmBtnText={confirmText || 'Yes'}
          cancelBtnText={cancelText || 'Cancel'}
          showCancel={true}>
          {confirmMessage || 'Are you sure?'}
        </SweetAlert>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelText, confirmMessage, confirmText, onDeleteConfirmed]
  );

  return { alert, showConfirmDialog, showSuccessMessage };
};
