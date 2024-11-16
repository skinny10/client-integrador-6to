function checkRandomEvent(probability) {
    return Math.random() < probability;
  }
  
  export default function ProbabilityEventComponent() {
    const [alert, setAlert] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (checkRandomEvent(0.1)) { // 10% de probabilidad
          setAlert(true);
        } else {
          setAlert(false);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        {alert ? <h2>¡Alerta de Evento Probabilístico!</h2> : <h2>No hay alerta</h2>}
      </div>
    );
  }
  