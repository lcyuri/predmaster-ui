import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import { User } from './models/user';
import { Pages } from './models/components';
import { Alarm } from './models/alarm';
import { Prevision } from './models/prevision';
import { Settings } from './models/settings';
import { getAlarm } from './services/alarmServices';
import { getPrevision } from './services/previsionService';
import { getSettings } from './services/settingsService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [previsions, setPrevisions] = useState<Prevision[]>([]);
  const [settings, setSettings] = useState<Settings[]>([]);
  const [currentPage, setCurrentPage] = useState<Pages>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.username) {
          const clientId = user.username;
  
          const alarmData = await getAlarm(clientId);
          setAlarms(alarmData);
    
          const previsionData = await getPrevision(clientId);
          setPrevisions(previsionData);
    
          const settingsData = await getSettings(clientId);
          setSettings(settingsData);

          setCurrentPage('/prevision');
        } else {
          throw new Error('Usuário não encontrado');
        }
      } catch (error) {
        console.error('fetchData -', error);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    navigate(currentPage);
  }, [currentPage]);

  return (
    <div className='app'>
      <Header clientName={user?.company} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <Routes>
        <Route path='/' element={<Login setUser={setUser} />} />
        <Route
          path='/prevision'
          element={<Main currentPage='/prevision' alarms={alarms} previsions={previsions} settings={settings} />}
        />
        <Route
          path='/settings'
          element={<Main currentPage='/settings' alarms={alarms} previsions={previsions} settings={settings} />}
        />
        <Route
          path='/alarm'
          element={<Main currentPage='/alarm' alarms={alarms} previsions={previsions} settings={settings} />}
        />
        <Route
          path='/history' />
      </Routes>
    </div>
  );
};

export default App;
