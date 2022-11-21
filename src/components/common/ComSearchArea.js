import { PropTypes } from 'prop-types';
import DateToDate from './DateToDate';
import Input from './Input';
import Select from './Select';
import { useForm } from 'react-hook-form';
import Checkbox from './Checkbox';
import { memo } from 'react';

const ComSearchArea = ({ onSubmit, props, menuId }) => {
  const searchForm = useForm();

  /* 타입에 따른 컴포넌트 렌더링 */
  const renderComp = (_props, form) => {
    switch (_props.type) {
      case undefined:
      case 'text':
      case 'date':
        return <Input className="searchAreaComp" {..._props} form={form} />;
      case 'checkbox':
        return <Checkbox className="searchAreaComp" {..._props} form={form} />;
      case 'select':
        return <Select className="searchAreaComp" {..._props} form={form} />;
      case 'dateToDate':
      case 'monthToMonth':
      case 'yearToYear':
        return (
          <DateToDate className="searchAreaComp" {..._props} form={form} />
        );
      default:
        return 'ERROR!';
    }
  };

  return (
    <>
      {props && props.length > 0 && (
        <form
          id={`searchArea_${menuId}`}
          className="searchAreaForm"
          onSubmit={searchForm.handleSubmit(onSubmit)}
        >
          {Array.isArray(props) &&
            props.map((prop) => (
              <label
                className="compLabel"
                key={prop.name}
                required={prop.required}
              >
                {prop.label}
                {renderComp(prop, searchForm)}
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

export default memo(ComSearchArea);
