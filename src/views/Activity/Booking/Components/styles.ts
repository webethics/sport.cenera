import { selectStyles } from '@cenera/common/styles/select-styles';

export const styles = () => ({
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: 'block',
    marginTop: '-12px',
  },
  ...selectStyles(),
});

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  transition: 'all',
  p: 4, 
}

