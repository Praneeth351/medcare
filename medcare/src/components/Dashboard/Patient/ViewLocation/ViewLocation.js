import React from "react";
import Navbar from "../../../Navbar/Navbar";
import styles from "./ViewLocation.module.css";

const googleMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.658177801225!2d84.85110217517575!3d25.549760677485683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d560b2087f153%3A0xff63f2f7544b29e1!2sHospital%2C%20IIT%20Patna!5e0!3m2!1sen!2sin!4v1750828323495!5m2!1sen!2sin";
export default function ViewLocation() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.frameContainer}>
        <p>{"**This map is for indicative purposes only**"}</p>
        <iframe
          className={styles.frame}
          src={googleMapUrl}
          title="Hospital Location"
          width={300}
          height={500}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
