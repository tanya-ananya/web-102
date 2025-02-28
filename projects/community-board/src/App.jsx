import './App.css';
import myImage from './img/GSU.webp';
import scrabbleImage from './img/scrabble.jpeg'
import lunchboxImage from './img/lunchbox.jpg'
import attImage from './img/att.jpg'
import googleImage from './img/google.webp'
import ukgImage from './img/ukg.webp'
import comcastImage from './img/comcast.png'
import eesImage from './img/ees.webp'
import wbImage from './img/wb.png'
import e3Image from './img/e3.webp'
import resumeImage from './img/rresume.jpg'
import microsoftImage from './img/microsoft.jpg'

const eventsOnCampus = [
  {
    name: "Lunch & Games",
    where: "55 Park Place",
    when: "March 6th",
    image: scrabbleImage,
    link: 'https://maps.app.goo.gl/5q6pdJv2bJFAdZb9A'
  },
  {
    name: "Snack & Study",
    where: "Online",
    when: "March 25th",
    image: lunchboxImage,
    link: 'https://www.zoom.com/'
  },
  {
    name: "AT&T Learn Night",
    where: "Midtown",
    when: "April 13th",
    image: attImage,
    link: '#'
  },
  {
    name: "Google Visit",
    where: "Midtown",
    when: "April 28th",
    image: googleImage,
    link: '#'
  },
  {
    name: "UKG Career Trek",
    where: "Atlanta",
    when: "May 15th",
    image: ukgImage,
    link: '#'
  },
  {
    name: "Comcast Company Visit",
    where: "Atlanta",
    when: "June 4th",
    image: comcastImage,
    link: '#'
  },
  {
    name: "Warner Brothers Visit",
    where: "Midtown",
    when: "July 2nd",
    image: wbImage,
    link: '#'
  },
  {
    name: "E3 Scholars Social",
    where: "Campus",
    when: "July 14th",
    image: e3Image,
    link: '#'
  },
  {
    name: "E3 Networking Event",
    where: "Campus",
    when: "August 7th",
    image: resumeImage,
    link: '#'
  },
  {
    name: "Lunch & Games",
    where: "55 Park Place",
    when: "August 23rd",
    image: scrabbleImage,
    link: '#'
  },
  {
    name: "Emerging Engineer Summit",
    where: "Online",
    when: "October 1st",
    image: eesImage,
    link: 'https://www.zoom.com/'
  },
  {
    name: "Microsoft Company Visit",
    where: "Midtown",
    when: "November 1st",
    image: microsoftImage,
    link: '#'
  }
]

const App = () => {

  return (
    <div className="App">
      <img src={myImage} alt="GSU Logo" className='gsu-logo' />
      <h1>Emerging Engineer Empowerment Events</h1>
      <h3>Check back here for a rundown of all events accessible to you for free as an E3 scholar!</h3>

      <div className='events-container'>
        {eventsOnCampus.map((place, index) => (
          <div key={index} className='events-card'>
            <img src={place.image} alt="" className='place-image' />
            <h2>{place.name}</h2>
            <p>{place.where}</p>
            <p>{place.when}</p>
            <a href={place.link} className='events-button'>View Map</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App