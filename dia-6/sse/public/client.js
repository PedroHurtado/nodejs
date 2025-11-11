let eventSource = null;
let notificationSource = null;

// Elementos del DOM
const eventsDiv = document.getElementById('events');
const notificationsDiv = document.getElementById('notifications');
const status1 = document.getElementById('status1');
const statusText1 = document.getElementById('statusText1');
const status2 = document.getElementById('status2');
const statusText2 = document.getElementById('statusText2');

// Función para actualizar estado de conexión
function updateStatus(statusElement, textElement, connected) {
  if (connected) {
    statusElement.className = 'status connected';
    textElement.textContent = 'Conectado';
  } else {
    statusElement.className = 'status disconnected';
    textElement.textContent = 'Desconectado';
  }
}

// Conectar a eventos continuos
document.getElementById('connectBtn').addEventListener('click', () => {
  if (eventSource) {
    return;
  }

  eventSource = new EventSource('http://localhost:3000/events');

  eventSource.onopen = () => {
    updateStatus(status1, statusText1, true);
    addEvent('Conexión establecida', 'system');
  };

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    addEvent(`${data.message} - Random: ${data.random}`, data.timestamp);
  };

  eventSource.onerror = () => {
    updateStatus(status1, statusText1, false);
    addEvent('Error en la conexión', 'error');
    eventSource.close();
    eventSource = null;
  };
});

// Desconectar eventos continuos
document.getElementById('disconnectBtn').addEventListener('click', () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    updateStatus(status1, statusText1, false);
    addEvent('Conexión cerrada', 'system');
  }
});

// Conectar a notificaciones
document.getElementById('notificationBtn').addEventListener('click', () => {
  if (notificationSource) {
    return;
  }

  notificationsDiv.innerHTML = '';
  notificationSource = new EventSource('http://localhost:3000/notification');

  notificationSource.onopen = () => {
    updateStatus(status2, statusText2, true);
  };

  // Escuchar eventos específicos
  notificationSource.addEventListener('info', (event) => {
    const data = JSON.parse(event.data);
    addNotification(data.message, 'info');
  });

  notificationSource.addEventListener('warning', (event) => {
    const data = JSON.parse(event.data);
    addNotification(data.message, 'warning');
  });

  notificationSource.addEventListener('success', (event) => {
    const data = JSON.parse(event.data);
    addNotification(data.message, 'success');
    // Cerrar después del último evento
    setTimeout(() => {
      notificationSource.close();
      notificationSource = null;
      updateStatus(status2, statusText2, false);
    }, 1000);
  });

  notificationSource.onerror = () => {
    updateStatus(status2, statusText2, false);
    notificationSource.close();
    notificationSource = null;
  };
});

// Funciones auxiliares para mostrar eventos
function addEvent(message, timestamp) {
  const eventDiv = document.createElement('div');
  eventDiv.className = 'event';
  eventDiv.innerHTML = `
    <strong>${new Date().toLocaleTimeString()}</strong><br>
    ${message}
  `;
  eventsDiv.insertBefore(eventDiv, eventsDiv.firstChild);
  
  // Mantener solo los últimos 10 eventos
  while (eventsDiv.children.length > 10) {
    eventsDiv.removeChild(eventsDiv.lastChild);
  }
}

function addNotification(message, type) {
  const notifDiv = document.createElement('div');
  notifDiv.className = `notification ${type}`;
  notifDiv.innerHTML = `
    <strong>${type.toUpperCase()}</strong><br>
    ${message}
  `;
  notificationsDiv.appendChild(notifDiv);
}