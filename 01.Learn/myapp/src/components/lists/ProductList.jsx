const products = [
  { id: 1, nombre: 'Taza', precio: 120 },
  { id: 2, nombre: 'Cuaderno', precio: 75 },
  { id: 3, nombre: 'Bolígrafo', precio: 35 },
];

function ProductList() {
  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.length === 0 ?
          (<p>No hay productos disponibles</p>) :
          products.map(product => (
            <li key={product.id}>{product.nombre} - ${product.precio}</li>
          ))}
      </ul>
    </div>
  );
}

export default ProductList;