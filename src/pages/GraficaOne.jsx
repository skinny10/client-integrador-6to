import React from 'react'
import BarraMenu from '../components/ui/BarraMenu/BarraMenu'
import GraficaBar from '../components/ui/GraficaBar'
import DataCollection from '../components/ui/DataCollection'

function GraficaOne() {
  return (
    <>
        <div className='dashboard-container'>
            <BarraMenu />
            <div className='main-content'>
                <GraficaBar />
                <DataCollection />
            </div>
        </div>
    </>
  )
}

export default GraficaOne