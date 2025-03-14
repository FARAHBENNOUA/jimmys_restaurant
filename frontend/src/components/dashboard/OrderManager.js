import React, { useState, useEffect } from 'react';
import './OrderManager.css';

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Simuler le chargement des commandes
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Remplacer par un appel API réel
        // const response = await orderAPI.getAllOrders();
        // setOrders(response.data);
        
        // Données simulées
        setTimeout(() => {
          const mockOrders = [
            {
              id: 1,
              user: { id: 1, name: 'Jean Dupont', email: 'jean@example.com' },
              items: [
                { id: 1, plat: { id: 1, name: 'Pizza Margherita' }, quantity: 2, price: 12.90 },
                { id: 2, plat: { id: 3, name: 'Tiramisu' }, quantity: 1, price: 6.90 }
              ],
              total_amount: 32.70,
              status: 'delivered',
              created_at: '2023-03-15T14:30:00Z',
              shipping_address: {
                fullName: 'Jean Dupont',
                address: '123 Rue de Paris',
                city: 'Paris',
                postalCode: '75001',
                phone: '0123456789'
              }
            },
            {
              id: 2,
              user: { id: 2, name: 'Marie Lambert', email: 'marie@example.com' },
              items: [
                { id: 3, plat: { id: 2, name: 'Burger Gourmet' }, quantity: 1, price: 14.50 },
                { id: 4, plat: { id: 4, name: 'Frites Maison' }, quantity: 1, price: 4.50 }
              ],
              total_amount: 19.00,
              status: 'pending',
              created_at: '2023-03-15T16:45:00Z',
              shipping_address: {
                fullName: 'Marie Lambert',
                address: '456 Avenue des Champs',
                city: 'Paris',
                postalCode: '75008',
                phone: '0123456789'
              }
            },
            {
              id: 3,
              user: { id: 3, name: 'Ahmed Bensalem', email: 'ahmed@example.com' },
              items: [
                { id: 5, plat: { id: 1, name: 'Pizza Margherita' }, quantity: 1, price: 12.90 },
                { id: 6, plat: { id: 5, name: 'Salade César' }, quantity: 1, price: 8.50 }
              ],
              total_amount: 21.40,
              status: 'processing',
              created_at: '2023-03-16T12:15:00Z',
              shipping_address: {
                fullName: 'Ahmed Bensalem',
                address: '789 Boulevard Saint-Michel',
                city: 'Paris',
                postalCode: '75005',
                phone: '0123456789'
              }
            }
          ];
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error("Erreur lors du chargement des commandes:", err);
        setError("Impossible de charger les commandes. Veuillez réessayer.");
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Remplacer par un appel API réel
      // await orderAPI.updateOrderStatus(orderId, newStatus);
      
      // Mise à jour locale
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err);
      setError("Impossible de mettre à jour le statut. Veuillez réessayer.");
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En préparation';
      case 'shipped': return 'Expédié';
      case 'delivered': return 'Livré';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="order-manager-container">
      <div className="manager-header">
        <h1>Gestion des commandes</h1>
        <div className="filter-container">
          <label htmlFor="status-filter">Filtrer par statut:</label>
          <select 
            id="status-filter" 
            value={statusFilter} 
            onChange={handleStatusFilterChange}
            className="status-filter"
          >
            <option value="all">Tous</option>
            <option value="pending">En attente</option>
            <option value="processing">En préparation</option>
            <option value="shipped">Expédié</option>
            <option value="delivered">Livré</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="order-manager-layout">
        <div className="orders-list-container">
          {loading ? (
            <div className="loading">Chargement des commandes...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>Aucune commande trouvée.</p>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map(order => (
                <div 
                  key={order.id} 
                  className={`order-item ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                  onClick={() => handleOrderSelect(order)}
                >
                  <div className="order-header">
                    <span className="order-id">Commande #{order.id}</span>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="order-user">
                    Client: {order.user.name}
                  </div>
                  <div className="order-details">
                    <div className="order-date">
                      {formatDate(order.created_at)}
                    </div>
                    <div className="order-total">
                      {order.total_amount.toFixed(2)} €
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="order-details-container">
          {selectedOrder ? (
            <div className="order-full-details">
              <div className="order-detail-header">
                <h2>Détails de la commande #{selectedOrder.id}</h2>
                <div className="order-actions">
                  <label htmlFor="status-change">Changer le statut:</label>
                  <select
                    id="status-change"
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En préparation</option>
                    <option value="shipped">Expédié</option>
                    <option value="delivered">Livré</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Informations client</h3>
                <div className="detail-field">
                  <span className="field-label">Nom:</span>
                  <span>{selectedOrder.user.name}</span>
                </div>
                <div className="detail-field">
                  <span className="field-label">Email:</span>
                  <span>{selectedOrder.user.email}</span>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Adresse de livraison</h3>
                <div className="detail-field">
                  <span className="field-label">Destinataire:</span>
                  <span>{selectedOrder.shipping_address.fullName}</span>
                </div>
                <div className="detail-field">
                  <span className="field-label">Adresse:</span>
                  <span>{selectedOrder.shipping_address.address}</span>
                </div>
                <div className="detail-field">
                  <span className="field-label">Ville:</span>
                  <span>
                    {selectedOrder.shipping_address.postalCode} {selectedOrder.shipping_address.city}
                  </span>
                </div>
                <div className="detail-field">
                  <span className="field-label">Téléphone:</span>
                  <span>{selectedOrder.shipping_address.phone}</span>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Produits commandés</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.plat.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toFixed(2)} €</td>
                        <td>{(item.price * item.quantity).toFixed(2)} €</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="total-label">Total</td>
                      <td className="total-value">{selectedOrder.total_amount.toFixed(2)} €</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="detail-section">
                <h3>Informations de commande</h3>
                <div className="detail-field">
                  <span className="field-label">Date de commande:</span>
                  <span>{formatDate(selectedOrder.created_at)}</span>
                </div>
                <div className="detail-field">
                  <span className="field-label">Statut:</span>
                  <span className={`status-badge ${getStatusClass(selectedOrder.status)}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-order-selected">
              <p>Sélectionnez une commande pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManager;