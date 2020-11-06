import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
`

export const Loader = styled.div`
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #151515; /* Blue */
    border-radius: 50%;
    margin-left: 360px;
    margin-top:  30px;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    color: #151515;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Title = styled.h1`
  flex: 1
  font-size: 48px;
  color: #FFFFFF;
  background-color: #151515;
  padding: 10px;
  border-radius: 5px;
  max-width: 450px;
  line-height: 36px;

  margin-top: 30px;
`;


export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Characters = styled.div`
  margin-top: 20px;
  max-width: 700px;

  a {
    background: #151515;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    flex-direction: row;
    justfy-content: center;
    align-items: center;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;
      justfy-content: center;
      align-items: center;

      strong {
        justfy-content: center;
        align-items: center;
        font-size: 30px;
        color: #fff
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  max-width: 700px;

  span {
    cursor: pointer;
    color: #FFFFFF;
    background-color: #151515;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
  }
`
