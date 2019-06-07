import React, { Component } from 'react'

const Feature = ({ image, title, description, link }) => (
    <div
      class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
      style={{ marginBottom: 15 }}
    >
      <div class="card">
        <picture>
          <source type="image/webp" srcSet={`/img/features/${image}.webp`} />
          <source type="image/jpeg" srcSet={`/img/features/${image}.png`} />
          <img class="material-icons" src={`/img/features/${image}.png`} alt={title} />
        </picture>
        <div class="card-body">
          <h5 class="card-title">
            {link ? (
              <a href={link} alt="View on Wiki">
                {title}
              </a>
            ) : (
              title
            )}
          </h5>
          <p class="card-text">{description}</p>
        </div>
      </div>
    </div>
  )
  
  export default Feature
