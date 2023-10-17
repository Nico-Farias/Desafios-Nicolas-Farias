export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce',
            version: '1.0.0',
            description: 'Aplicacion backend para ecommerce'
        },
        servers: [
            {
                url: 'http://localhost:8080/api'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}
