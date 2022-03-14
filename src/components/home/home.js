import React, { useState , useEffect} from 'react';
import './home.scss'
import { useNavigate} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home= (props)=>{
    let navigate= useNavigate()
    const [error, setError] = useState(null);
    const [fetchData, updateData] = useState(false);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
      fetchApi()
    }, []);
    const fetchApi=()=>{
      axios
        .get("https://randomuser.me/api/?results=50")
        .then(res => {
          setItems(items.length !== 0? [...items, ...res.data.results] : res.data.results);
        })
        .catch(
          (error) => {
            setError(error);
          }
        )
        console.log(items.length)
    }
    const logout=()=>{
      localStorage.clear();
      navigate('/')
    }
  return(
        <div className="home"> 
            { localStorage.getItem('loggedIn') ?  
            <div className='list'>    
                 <div className='header'> <img src='https://www.svgrepo.com/show/17116/contacts.svg' /> Contacts <span className='logout' onClick={logout}>Logout</span></div>
            { items.length !== 0 && 
              <div className='main'>
                <InfiniteScroll  dataLength={items.length}
                next={fetchApi}
                hasMore={true}
                loader={<Skeleton count={2}/>}
                >
                {
                    items.map( item =>(
                        <div className='items clearfix'>
                          <span className='text'>{item.name.first+' '+item.name.last}</span>
                        <img src={item.picture.thumbnail}/>
                        </div>
                    ))
                }
                </InfiniteScroll>
            </div>}
            </div> 
            :
            <div> You are not Logged in please Login </div>
                }  
      </div>  
    );
}
export default Home;
