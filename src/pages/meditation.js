import Layout from '../components/shared/Layout/Layout';
import { useEffect, useState } from 'react';
import { getAllMeditationTracks } from '../api/meditation-api';
import toastr from 'toastr';
import MeditationTrack from '../components/others/MeditationTrack/MeditationTrack';
import useAuthenticationStatus from "../hooks/auth/useAuthenticationStatus";
import {useNavigate} from "react-router-dom";

function Meditation() {
  const [tracks, setTracks] = useState(null);
  const isLoggedIn = useAuthenticationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Meditation Space';
  }, []);

  useEffect(() => {
    if (tracks === null && isLoggedIn) {
      getAllMeditationTracks()
        .then((response) => {
          setTracks(response.data.tracks);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }
  });

  if (!isLoggedIn) {
    navigate('/login')
  }

  if (tracks === null) {
    return 'Loading...';
  }

  return (
    <Layout>
      <h1
        className={
          'text-3xl text-black text-center leading-none mt-7 flex justify-center font-montserrat'
        }
      >
        Meditation Space{' '}
        <small
          className={
            'flex justify-center items-center text-xs text-red-500 border border-red-600 ml-2 w-7 h-7 rounded-full'
          }
        >
          <span className={'font-montserrat font-bold leading-none'}>Pro</span>
        </small>
      </h1>

      <div className='px-7'>
        <p className={'font-medium text-center text-main my-8 font-montserrat'}>
          The following tracks will help you focus and meditate to get the best
          out of yourself, browse our library of tracks and play the one that
          suits you.
        </p>

        <div className='flex flex-row justify-between flex-wrap'>
          {tracks instanceof Array && tracks.length > 0
            ? tracks.map((track) => {
                return <MeditationTrack key={track.id} track={track} />;
              })
            : ''}
        </div>
      </div>
    </Layout>
  );
}

export default Meditation;
