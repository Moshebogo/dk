import { useState } from "react"
import { json } from "react-router-dom"

export default function Contact() {


    const formId = 'pawgx8tS'
    const formSparkUrl = `https://submit-form.com/${formId}`

    function submitForm(e) {
        e.preventDefault()
        fetch(formSparkUrl,{
            method: 'POST',
            Headers: {'Content-Type': 'application/Json'},
            body: JSON.stringify(contactInfo)
        })

    }


    const [sendEmail, setSendEmail] = useState(false)
    const [contactInfo, setContactInfo] = useState({
        name: "",
        heading: "",
        email: "",
        message: ""
    })

    function createEmail(e) {
        e.preventDefault()
        setContactInfo({
            name: "",
            heading: "",
            email: "",
            message: ""
        })
        console.log(contactInfo)
    }


    return (
        <div> 
          <form id="contactForm" onSubmit={submitForm}>
          <h1>We would love to hear any of your  Feedback, Criticism or thoghts!</h1>
            <label>Name: </label>
            <input 
              type="text"
              placeholder="Your Name Here!"
              value={contactInfo.name}
              onChange={ (e) => setContactInfo({...contactInfo, name: e.target.value})} 
              required
            ></input>

            <label>Heading: </label>
            <input
              type="text"
              placeholder="Your Heading Here!"
              value={contactInfo.heading}
              onChange={ (e) => setContactInfo({...contactInfo, heading: e.target.value})}
              required 
            ></input>

            <label>Email Address: </label>
            <input
              type="email"
              placeholder="Your Email Here!"
              value={contactInfo.email}
              onChange={ (e) => setContactInfo({...contactInfo, email: e.target.value})} 
              required
            ></input>

            <label>Message: </label>
            <textarea
              type="text"
              placeholder="Your Message here!"
              value={contactInfo.message}
              onChange={ (e) => setContactInfo({...contactInfo, message: e.target.value})}
              rows={8}
              required 
            ></textarea>

            <input type="submit"></input>
          </form>
          {/* {sendEmail ? 
          < 
           <} */}
        </div>
    )
}