"use strict";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon-2x.png";
import { Icon } from "leaflet";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

//geolocatioApi
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const { latitude, longitude } = pos.coords;
      const coords = [latitude, longitude];

      console.log(
        `https://www.google.com.mx/maps/@${latitude},${longitude},15z?entry=ttu`
      );
      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng], {
          icon: new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        })
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              offset: [0, -20],
              autoClose: false,
              closeOnClick: false,
              className: "running-popup",
            }).setContent("Workout ajghaprghaprgha ")
          )
          .openPopup();
      });
    },
    function () {
      alert("No se pudo obtener la ubicación");
    }
  );
}
