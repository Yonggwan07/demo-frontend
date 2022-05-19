import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import DateToDate from './DateToDate';
import Input from './Input';
import Select from './Select';

/* 조회영역 박스 */
const SearchAreaBox = styled.div`
  display: flex;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 1rem;
  background: lightgray;
  border-radius: 2px;
  height: 1.5rem;
  align-items: center;
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
  font-size: 1rem;
  font-weight: bold;
  ${(props) =>
    props.mendatory &&
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

const ComSearchArea = ({ props }) => (
  <SearchAreaBox>
    {Array.isArray(props) &&
      props.map((prop) => (
        <SearchAreaItem key={prop.name}>
          <SearchAreaLabel mendatory={prop.mendatory}>
            {prop.label}
          </SearchAreaLabel>
          <SearchAreaComp>{renderComp(prop)}</SearchAreaComp>
        </SearchAreaItem>
      ))}
  </SearchAreaBox>
);

ComSearchArea.propTypes = {
  props: PropTypes.array.isRequired,
};

export default ComSearchArea;
