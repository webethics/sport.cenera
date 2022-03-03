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
