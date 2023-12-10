import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { HeaderProps } from '../models/components';
import logo from '../assets/img/logo.png';

const Header: React.FC<HeaderProps> = ({clientName, currentPage, setCurrentPage}) => {
  const getTitle = (): string => {
    switch (currentPage) {
      case '/prevision':
        return 'Previsão';
      case '/alarm':
        return 'Alarme';
      case '/settings':
        return 'Sensores';
      default:
        return 'Previsão';
    }
  };

  const handlePageChange = (page: string | null) => {
    setCurrentPage(page);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
      <div className='container-lg'>
        <a className='navbar-brand d-flex align-items-center' href='/login'>
          <img
            src={logo}
            width='40'
            height='34'
            className='d-inline-block align-top me-2'
            alt=''
          />
          <span className='ms-2' style={{ color: '#3957AF', fontWeight: 'bold' }}>
            PredMaster
          </span>
        </a>
        <div className='d-flex align-items-center'>
          {clientName && (
            <div className='me-3 border-end pe-3'>
              <div className='collapse navbar-collapse'>
                <ul className='navbar-nav me-auto'>
                  <NavDropdown title={getTitle()} id='basic-nav-dropdown' onSelect={handlePageChange}>
                    <NavDropdown.Item eventKey='/prevision'>Previsão</NavDropdown.Item>
                    <NavDropdown.Item eventKey='/alarm'>Alarme</NavDropdown.Item>
                    <NavDropdown.Item eventKey='/settings'>Sensores</NavDropdown.Item>
                  </NavDropdown>
                </ul>
              </div>
            </div>
          )}
          <span className='me-3'>{clientName ?? 'Nome do cliente'}</span>
          <i className='fas fa-user-circle fa-lg d-inline-block align-top rounded-circle'></i>
        </div>
      </div>
    </nav>
  );
};

export default Header;