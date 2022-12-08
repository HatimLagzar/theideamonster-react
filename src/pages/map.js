import Layout from "../components/shared/Layout/Layout";
import {useEffect, useRef, useState} from "react";
import styles from './../styles/pages/map.module.css'
import MapAddMilestoneButton from "../components/others/MapAddMilestoneButton/MapAddMilestoneButton";
import MapAddMilestoneForm from "../components/others/MapAddMilestoneForm/MapAddMilestoneForm";
import {getUserCategories} from "../api/categories-api";
import toastr from "toastr";
import {getRandomQuote, getUserMilestones, updateMilestone} from "../api/map-api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import 'react-circular-progressbar/dist/styles.css';
import ShowMilestoneDetails from "../components/others/ShowMilestoneDetails/ShowMilestoneDetails";
import EditMilestoneMapForm from "../components/others/EditMilestoneMapForm/EditMilestoneMapForm";
import Draggable from "react-draggable";
import {random} from "lodash/number";
import MapQuote from "../components/others/MapQuote/MapQuote";
import useAuthenticationStatus from "../hooks/auth/useAuthenticationStatus";
import {useNavigate} from "react-router-dom";

function Map() {
  const [showCreateMilestoneForm, setShowCreateMilestoneForm] = useState(false);
  const [showEditMilestoneForm, setShowEditMilestoneForm] = useState(false);
  const [baskets, setBaskets] = useState(null);
  const [randomQuote, setRandomQuote] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [fullInPixel, setFullInPixel] = useState(370);
  const videoRef = useRef();
  const pageContentWrapperRef = useRef();
  const isLoggedIn = useAuthenticationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Milestones Map';
    document.querySelector("body").style.overflow = 'hidden';
    getFullInPixel();
  }, []);

  useEffect(() => {
    if (milestones === null && isLoggedIn) {
      getUserMilestones()
        .then(response => {
          setMilestones(response.data.milestones);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [milestones]);

  useEffect(() => {
    if (baskets === null && isLoggedIn) {
      getUserCategories()
        .then(response => {
          setBaskets(response.data.categories);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [baskets]);

  useEffect(() => {
    let abortController = new AbortController();

    if (randomQuote === null) {
      getRandomQuote(abortController)
        .then(response => {
          setRandomQuote(response.data.quote);
        })
    }

    return () => {
      abortController.abort();
    }
  }, [randomQuote]);

  if (!isLoggedIn) {
    navigate('/login')
  }

  function calculatePercentage(reelValue) {
    return (Math.floor((reelValue * 60) / 100) + 9) + '%';
  }

  function handleShowMilestoneDetails(milestone) {
    setSelectedMilestone(milestone)
  }

  function getFullInPixel() {
    const topBottomValue = document.querySelector('#top-anchor').getBoundingClientRect();
    const bottomBottomValue = document.querySelector('#bottom-anchor').getBoundingClientRect();

    console.log(bottomBottomValue.top - topBottomValue.top)

    setFullInPixel(Math.floor(bottomBottomValue.top - topBottomValue.top));
  }

  function handleUpdatePercentageOfMilestone(e, data, milestone) {
    let percentage;
    if (data.y > 0) {
      // Decreased percentage
      percentage = Math.max(0, Math.floor(parseInt(milestone.percentage) - (Math.abs(data.y) / (fullInPixel / 100))));
    } else if (data.y < 0) {
      // Increased percentage
      percentage = Math.min(Math.floor(parseInt(milestone.percentage) + (Math.abs(data.y) / (fullInPixel / 100))), 100);
    }

    updateMilestone(
      milestone.id,
      milestone.ends_at,
      milestone.basket_id,
      percentage,
      milestone.is_done
    )
      .then(response => {
        data.node.style.transform = "translate(0, 0)";

        if (percentage >= 100) {
          videoRef.current.style.display = 'block';
          pageContentWrapperRef.current.style.display = 'none';
          videoRef.current.play();
          videoRef.current.onended = () => {
            videoRef.current.style.display = 'none';
            pageContentWrapperRef.current.style.display = 'block';
          }
        }

        setMilestones([
          ...milestones.map(item => {
            if (item.id === milestone.id) {
              item.percentage = percentage;
            }

            return item;
          })
        ])
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <Layout>
    <video ref={videoRef}
           className={styles.video + ' absolute top-0 left-0 w-full h-full z-20'}
           src={'/videos/celebration.mp4'}
           controls={false}
           autoPlay={false}
           style={{display: 'none'}}
    ></video>

    <div ref={pageContentWrapperRef} className={styles.background}>
      <img className={styles.bgImage} src="/images/map-bg.png" alt="Background"/>
      <div className={styles.wrapper}>
        <h1 className={'text-3xl text-white text-center leading-none flex justify-center'}>
          Milestones Map{' '}
          <small
            className={'flex justify-center items-center text-xs text-red-500 border border-red-600 ml-2 w-7 h-7 rounded-full'}>
            <span className={'font-montserrat font-bold leading-none'}>Pro</span>
          </small>
        </h1>

        <div className={styles.road} style={{backgroundImage: 'url(/images/road.png)'}}>
          <button
            id={'bottom-anchor'}
            className={'absolute invisible'}
            style={{
              bottom: calculatePercentage(0)
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} size={'lg'} color={'white'}/>
          </button>
          {
            milestones instanceof Array
              ? milestones.map(milestone => {
                return <Draggable
                  key={random(100000, 100000000) + '-milestone-position'}
                  axis={'y'}
                  onStop={(e, data) => handleUpdatePercentageOfMilestone(e, data, milestone)}
                  onMouseDown={() => handleShowMilestoneDetails(milestone)}
                  grid={[5, 5]}
                >
                  <button
                    className={'absolute'}
                    style={{
                      bottom: calculatePercentage(milestone.percentage)
                    }}
                  >
                    <FontAwesomeIcon icon={faLocationDot} size={'lg'}
                                     color={selectedMilestone && selectedMilestone.id === milestone.id ? 'yellow' : '#5a62cf'}/>
                  </button>
                </Draggable>
              })
              : ''
          }
          <button
            id={'top-anchor'}
            className={'absolute invisible'}
            style={{
              bottom: calculatePercentage(100)
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} size={'lg'} color={'black'}/>
          </button>
        </div>

        {
          selectedMilestone && <ShowMilestoneDetails setShowEditMilestoneForm={setShowEditMilestoneForm}
                                                     milestone={selectedMilestone}/>
        }

        <MapAddMilestoneButton onClick={() => setShowCreateMilestoneForm(true)}/>

        {
          showCreateMilestoneForm && <MapAddMilestoneForm baskets={baskets}
                                                          setBaskets={setBaskets}
                                                          milestones={milestones}
                                                          setMilestones={setMilestones}
                                                          handleCloseClick={() => setShowCreateMilestoneForm(false)}/>
        }

        {
          showEditMilestoneForm && <EditMilestoneMapForm milestone={selectedMilestone}
                                                         milestones={milestones}
                                                         setMilestones={setMilestones}
                                                         setSelectedMilestone={setSelectedMilestone}
                                                         handleCloseClick={() => setShowEditMilestoneForm(false)}/>
        }

        {
          randomQuote && <MapQuote quote={randomQuote}/>
        }
      </div>
    </div>
  </Layout>

}

export default Map;