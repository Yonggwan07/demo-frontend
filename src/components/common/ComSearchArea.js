import { PropTypes } from 'prop-types';
import DateToDate from './DateToDate';
import Input from './Input';
import Select from './Select';
import { useForm } from 'react-hook-form';

const ComSearchArea = ({ onSubmit, props }) => {
  const {
    register,
    handleSubmit,
    //watch,
    //formState: { errors },
  } = useForm();

  /* 타입에 따른 컴포넌트 렌더링 */
  const renderComp = (_props, _register) => {
    switch (_props.type) {
      case undefined:
      case 'text':
      case 'checkbox':
      case 'date':
        return <Input className="searchAreaComp" {..._props} register={_register} />;
      case 'select':
        return <Select className="searchAreaComp" {..._props} register={_register} />;
      case 'dateToDate':
      case 'monthToMonth':
      case 'yearToYear':
        return <DateToDate className="searchAreaComp" {..._props} register={_register} />;
      default:
        return 'ERROR!';
    }
  };

  return (
    <>
      {props && props.length > 0 && (
        <form
          id="searchArea"
          className="searchAreaForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {Array.isArray(props) &&
            props.map((prop) => (
              <label
                className="compLabel"
                key={prop.name}
                required={prop.required}
              >
                {prop.label}
                {renderComp(prop, register)}
              </label>
            ))}
        </form>
      )}
    </>
  );
};

ComSearchArea.propTypes = {
  props: PropTypes.array.isRequired,
};

export default ComSearchArea;
