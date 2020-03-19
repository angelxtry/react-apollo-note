import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  transform: scale(0.8);
`;

interface Props {
  goTo: string;
  className?: string;
}

const Plus: React.FC<Props> = ({ goTo, className }) => (
  <Container className={className}>
    <Link to={goTo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" />
      </svg>
    </Link>
  </Container>
);

Plus.propTypes = {
  goTo: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Plus.defaultProps = {
  className: '',
};

export default Plus;
