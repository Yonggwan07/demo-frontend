import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import DateToDate from './DateToDate';
import Input from './Input';
import Select from './Select';

/* 조회영역 폼 */
const SearchAreaForm = styled.form`
  display: flex;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 1rem;
  background: lightgray;
  border-radius: 2px;
  height: 1.5rem;
`;
/* 조회조건 아이템 */
const SearchAreaItem = styled.div`
  display: flex;
  height: 1.5rem;
  & + & {
    margin-left: 2rem;
  }
`;
/* 조회조건 아이템 - 레이블 */
const SearchAreaLabel = styled.label`
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1.5rem;
  user-select: none;
  font-family: 'Malgun Gothic';
  ${(props) =>
    props.required &&
    css`
      &::before {
        content: '* ';
        color: red;
      }
    `}
`;
/* 조회조건 아이템 - 컴포넌트 */
const SearchAreaComp = styled.div`
  label + & {
    margin-left: 0.5rem;
  }
`;
/* 타입에 따른 컴포넌트 렌더링 */
const renderComp = (prop) => {
  switch (prop.type) {
    case undefined:
    case 'text':
    case 'checkbox':
    case 'date':
      return <Input {...prop} />;
    case 'select':
      return <Select {...prop} />;
    case 'dateToDate':
    case 'monthToMonth':
    case 'yearToYear':
      return <DateToDate {...prop} />;
    default:
      return 'ERROR!';
  }
};

const ComSearchArea = ({ onSubmit, props }) => (
  <SearchAreaForm id="searchArea" onSubmit={onSubmit}>
    {Array.isArray(props) &&
      props.map((prop) => (
        <SearchAreaItem key={prop.name}>
          <SearchAreaLabel required={prop.required}>
            {prop.label}
          </SearchAreaLabel>
          <SearchAreaComp>{renderComp(prop)}</SearchAreaComp>
        </SearchAreaItem>
      ))}
  </SearchAreaForm>
);

ComSearchArea.propTypes = {
  props: PropTypes.array.isRequired,
};

export default ComSearchArea;
