import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='about' id='about'>
      <h1 className='about-heading'>About Us</h1>
      <p>
      Welcome to TastyTrack , your ultimate food ordering app designed to make delicious meals accessible with just a few taps. We partner with top restaurants to bring you a wide variety of cuisines, from local street food to gourmet dishes, ensuring there’s something for everyone. Our mission is to revolutionize the food delivery experience by offering lightning-fast service, secure and easy payments, real-time order tracking, and exciting daily deals.Whether you're craving a quick snack or a full-course meal, [Your App Name] delivers fresh, hot, and tasty food right to your doorstep. Order now and experience convenience, speed, and flavor like never before! 
      </p>
      <p>
      Experience the joy of effortless food ordering with TastyTrack , where delicious meals are just a tap away.
      </p>

      <div className='about-icons'>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-youtube"></i>
      </div>
      
    </div>
  )
}

export default About
