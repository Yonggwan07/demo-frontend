import { PropTypes } from 'prop-types';
export const commonMenuPropType = {
  menuInfo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    upperMenus: PropTypes.array,
  }).isRequired,
  search: PropTypes.func,
  save: PropTypes.func,
  remove: PropTypes.func,
};
