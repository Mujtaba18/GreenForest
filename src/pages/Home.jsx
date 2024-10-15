import { useNavigate } from "react-router-dom"

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
      <img id="home-img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.holidify.com%2Fimages%2Fcmsuploads%2Fcompressed%2F056A9252_20221018133643.jpeg&f=1&nofb=1&ipt=9ef8bb1592cdf9d56c5375637d4058a7854e84b99104584e1a67888e5e53f3a3&ipo=images" alt="Park Image" width="100%" height="450px"/>
      <h1 id="home-title">Welcome To The Greenest Forest Park</h1>
      <button id="viewPark" onClick={() => navigate('/parks')}>View Parks</button>
    </div>
  )
}

export default Home
