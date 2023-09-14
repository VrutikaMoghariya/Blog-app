import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Contact() {

  const navigate = useNavigate();
  useEffect(() => {

    const adminToken = localStorage.getItem("Admin-token");

    if (!adminToken) {
      navigate("/contact");
    }
    else {
      navigate("/admin/dashboard");
    }

  }, [navigate])


  return (
    <>
      <Header />

      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contatc Us</h3>
                        <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                        <input type="text" className="form-control form-group" placeholder="Name" />
                        <input type="text" className="form-control form-group" placeholder="Email" />
                        <textarea className="form-control form-group" placeholder="Message"></textarea>
                        <button className="contact_form_submit">Send</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <li><a href="/#"><i className="fab fa-facebook-square"></i></a></li>
                        <li><a href="/#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="/#"><i className="fab fa-twitter"></i></a></li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-white contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset"></i>
                    <span>+91 8009 054294</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text"></i>
                    <span>info@neon.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-map-marked-alt"></i>
                    <span>1000+ user connected with neon</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quo beatae quasi assumenda, expedita aliquam minima tenetur maiores neque incidunt repellat aut voluptas hic dolorem sequi ab porro, quia error.</p>
                <div className="map_bind">
                  <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.67289598443!2d72.65748678122783!3d21.159440562025313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1694665809867!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Contact;