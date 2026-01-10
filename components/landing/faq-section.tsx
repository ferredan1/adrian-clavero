"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    category: "Mis pedidos",
    questions: [
      {
        question: "¿Cómo hago para comprar en Ferretería Dany online?",
        answer: "Ingresá a nuestra tienda online, elegí los productos que necesitás y agregalos al carrito. Una vez que termines, hacé clic en \"Finalizar compra\", completá tus datos de envío o retiro y seleccioná la forma de pago. Al confirmar, te vamos a enviar por mail la información de tu pedido."
      },
      {
        question: "Compré con envío a domicilio, ¿cuándo llegará mi pedido?",
        answer: "Realizamos envíos a domicilio según la zona. Durante la compra vas a ver el plazo estimado de entrega para tu dirección. Apenas despachemos tu pedido te enviamos la información de seguimiento por mail o WhatsApp. Las entregas se realizan en días hábiles, en horarios de reparto, en planta baja y en domicilios de fácil acceso. Es importante que haya una persona mayor de edad para recibir el pedido con su DNI."
      },
      {
        question: "¿Cuánto tiempo tengo para retirar mi pedido en el local?",
        answer: "Si elegís la opción \"Retiro en sucursal\", te avisamos cuando tu pedido esté listo. Desde ese momento contás con un plazo determinado (informado en el mail o WhatsApp de confirmación) para acercarte a retirarlo. Te recomendamos hacerlo lo antes posible para asegurar stock."
      }
    ]
  },
  {
    category: "Mis pagos",
    questions: [
      {
        question: "¿Cuáles son las formas de pago disponibles?",
        answer: "Trabajamos con los principales medios de pago del mercado. Dependiendo de la modalidad disponible al momento de tu compra, podés abonar con: Tarjetas de crédito y débito mediante pasarelas de pago seguras. Transferencia bancaria (cuando esté habilitada). Otros medios electrónicos que se informan en el checkout. En la etapa final de la compra vas a ver el detalle de cuotas, promociones y opciones disponibles al momento."
      },
      {
        question: "¿Hacen factura A?",
        answer: "Sí, emitimos factura A para responsables inscriptos. Al finalizar tu compra, indicá que necesitás factura A y completá los datos fiscales requeridos. Si tenés alguna duda, podés contactarnos para que te ayudemos con el proceso."
      },
      {
        question: "La transacción fue rechazada por el banco, ¿qué hago?",
        answer: "Si tu pago fue rechazado, te sugerimos comunicarte con el banco o la emisora de tu tarjeta. A veces las compras online se bloquean por: Importe fuera de tus consumos habituales. Límite de compra diario o mensual alcanzado. Restricciones para compras por Internet o en cuotas. Una vez que el banco revise la situación, podés intentar nuevamente el pago en nuestra tienda."
      }
    ]
  },
  {
    category: "Información",
    questions: [
      {
        question: "¿Mis datos personales están protegidos?",
        answer: "Sí. En Ferretería Dany cuidamos tus datos personales de acuerdo con la normativa vigente en Argentina sobre protección de datos de carácter personal. Utilizamos tu información únicamente para gestionar tus pedidos, validar tus datos de contacto y facturación, y enviarte novedades o promociones cuando nos autorizás. Podés acceder, rectificar o solicitar la eliminación de tus datos ingresando a \"Mi cuenta\" o escribiéndonos a nuestros canales de contacto."
      },
      {
        question: "¿Es seguro comprar en Ferretería Dany online?",
        answer: "Sí. Nuestra tienda online opera con plataformas de pago que utilizan estándares de seguridad reconocidos (conexiones cifradas y entornos protegidos) para que tus datos viajen de forma segura. No almacenamos los datos completos de tu tarjeta en nuestros sistemas y tu información permanece confidencial durante todo el proceso de compra."
      },
      {
        question: "Quiero cambiar el producto que compré, ¿puedo?",
        answer: "Sí, podés solicitar el cambio siempre que se cumplan las siguientes condiciones: Tenés hasta 15 días corridos desde la fecha de entrega del pedido para avisarnos tu necesidad de cambiarlo o devolverlo y contarnos el motivo. El cambio o devolución debe responder a alguna de estas causas: El producto recibido no coincide con el que fue solicitado. Hubo un error en la preparación del pedido por parte de Ferretería Dany. El producto llegó dañado o con falla de fábrica. En todos los casos, el producto no puede haber sido usado y debe conservar su embalaje original, accesorios y etiquetas, tal como fue recibido. Es obligatorio presentar la factura o comprobante de compra. No se aceptan cambios ni devoluciones de productos de pintura preparados mediante sistemas tintométricos (colores personalizados). Cumplidas estas condiciones, gestionamos el cambio del producto. Para iniciar un cambio o devolución, contactanos a nuestro Centro de Atención: WhatsApp: +54 9 11 2034-5160 | Email: ferreteria-dany@hotmail.com"
      }
    ]
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c62828]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Resolvemos tus dudas sobre compras, pagos y más
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemIndex = categoryIndex * 10 + index
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: itemIndex * 0.05, duration: 0.6 }}
                    >
                      <AccordionItem
                        value={`item-${itemIndex}`}
                        className="border-2 border-gray-200 rounded-2xl px-6 hover:border-[#c62828]/40 transition-all duration-300 bg-white hover:shadow-lg hover:bg-gradient-to-br hover:from-white hover:to-red-50/20"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#c62828] transition-colors py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 leading-relaxed pb-5 font-light whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  )
                })}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

