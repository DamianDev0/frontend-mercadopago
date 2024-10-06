import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

const Mercadopago = () => {
  const [initPoint, setInitPoint] = useState(null); // Cambiado a initPoint
  const [error, setError] = useState(null);

  useEffect(() => {
    initMercadoPago('APP_USR-2458735c-48ec-4f17-8aab-71cae81ea36a', { locale: 'es-CO' });

    const fetchPreferenceId = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const userId = sessionStorage.getItem("userId");

      try {
        const response = await fetch('http://localhost:3000/api/v1/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            userId: userId,
            productCartId: '6701dceff6acc5e174406299',
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(`Error al crear la preferencia: ${errorResponse}`);
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);
        setInitPoint(data.init_point);
      } catch (error) {
        console.error('Error al crear la preferencia:', error);
      }
    };

    fetchPreferenceId();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {initPoint ? ( 
        <div>
          <p>¡Listo para pagar!</p>
          <a href={initPoint} target="_blank" rel="noopener noreferrer">
            Ir a Mercado Pago
          </a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Mercadopago;
