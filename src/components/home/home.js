import React, { useState , useEffect} from 'react';
import './home.scss'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home= (props)=>{
    let navigate= useNavigate()
    const [error, setError] = useState(null);
    const [fetchData, updateData] = useState(false);
    const [items, setItems] = useState([]);
    const [loader, setLoading]= useState(false);

    function handleScroll(){
      let timer
      if(window.innerHeight + document.documentElement.scrollTop!==document.documentElement.offsetHeight){
        return;
      }
      else {
        setLoading(true)
        betterFunction()      
        }
      }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
      fetchApi()
    }, []);
    const fetchApi=()=>{
      axios
        .get("https://randomuser.me/api/?results=50")
        .then(res => {
          setItems(prevItems=> [...prevItems, ...res.data.results]);
          setLoading(false)
        })
        .catch(
          (error) => {
            setError(error);
          }
        )
    }
    const logout=()=>{
      localStorage.clear();
      navigate('/')
    }    
    const debounce = function (fn, delay) {
      let timer;
      return function () {
        let context = this
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context);
          setLoading(false);
        }, delay);
      }
    }
    const betterFunction = debounce(fetchApi, 1000);

  return(
        <div className="home"> 
            { localStorage.getItem('loggedIn') ?  
            <div className='list'>    
                 <div className='header'> <img src='https://www.svgrepo.com/show/17116/contacts.svg' /> Contacts <span className='logout' onClick={logout}>Logout</span></div>
            { items.length !== 0 && 
              <div className='main'>
                
                {
                    items.map( item =>(
                        <div className='items clearfix'>
                          <span className='text'>{item.name.first+' '+item.name.last}</span>
                        <img src={item.picture.thumbnail}/>
                        </div>
                    ))
                }
              {loader && <Skeleton count={5}/>}
            </div>}
            </div> 
            :
            <div> You are not Logged in please<Link to='/'> Login </Link>  </div>
                }  
      </div>  
    );
}
export default Home;
