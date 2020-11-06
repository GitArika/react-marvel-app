import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    cursor: pointer;
    color: #FFFFFF;
    background-color: #151515;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const CharacterInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;
    background-color: #151515;
    border-radius: 4px;
    padding: 10px;
    
    img {
      width: 300px;
      height: 300px;
      border-radius: 50%;
    }

    div + div {
      flex: 1;
      border-left: 5px solid red;
      padding-left: 5px;
    }

    div {
      margin-left: 24px;
      strong {
        font-size: 36px;
        color: #fff;
      }

      p {
        font-size: 18px;
        color: #fff;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #fff;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #fff;
      }
    }
  }
`;