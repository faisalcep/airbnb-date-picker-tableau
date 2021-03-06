import { useState, useRef, useEffect } from "react"

import "../styles/Viz.css"

const { tableau } = window

export default function Viz({ startDate, endDate }) {
  const [viz, setViz] = useState(null)

  // Set up the arguments to pass into the Tableau Viz function
  const ref = useRef(null)
  const url =
    "https://public.tableau.com/views/Airbnb-date-picker/AirbnbDatePicker"
  const options = {
    hideTabs: true,
    hideToolbar: true,
  
    onFirstInteractive: function() {
      console.log("This viz is interactive.")
    },
  }

  // This function will be run on page load to initialize our viz.
  const initViz = () => {
    setViz(new tableau.Viz(ref.current, url, options))
  }

  // Initialize viz when the page loads
  useEffect(initViz, [])

  // This function will run with the startDate is changed
  // update the parameter value in the workbook and update the viz
  async function changeStartDateParameterValue(startDate) {
    let startYear, startMonth, startDay

    if (startDate === null) {
      startYear = 2017
      startMonth = 0
      startDay = 1
    } else {
      startYear = startDate._d.getUTCFullYear()
      startMonth = startDate._d.getUTCMonth()
      startDay = startDate._d.getUTCDate()
    }

    if (viz !== null) {
      const workbook = viz.getWorkbook()

      workbook.changeParameterValueAsync(
        "Start Date",
        new Date(Date.UTC(startYear, startMonth, startDay))
      )
    } else {
      console.log("We don't have a viz yet")
    }
  }

  // This hook is listening to the startDate prop. When it's changed the
  // changeStartDateParameterValue function will run with the new startDate
  useEffect(() => {
    changeStartDateParameterValue(startDate)
  }, [startDate])

  // This function will run with the endDate is changed
  // update the parameter value in the workbook and update the viz
  async function changeEndDateParameterValue(endDate) {
    let endYear, endMonth, endDay

    if (endDate === null) {
      endYear = 2020
      endMonth = 12
      endDay = 31
    } else {
      endYear = endDate._d.getUTCFullYear()
      endMonth = endDate._d.getUTCMonth()
      endDay = endDate._d.getUTCDate()
    }

    if (viz !== null) {
      const workbook = viz.getWorkbook()

      workbook.changeParameterValueAsync(
        "End Date",
        new Date(Date.UTC(endYear, endMonth, endDay))
      )
    } else {
      console.log("We don't have a viz yet")
    }
  }

  // This hook is listening to the startDate prop. When it's changed the
  // changeStartDateParameterValue function will run with the new startDate
  useEffect(() => {
    changeEndDateParameterValue(endDate)
  }, [endDate])

  return <div className="viz" ref={ref} />
}
