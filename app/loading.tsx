export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-primary border-t-transparent mb-4"></div>
        <p className="text-lg sm:text-xl text-muted-foreground">Cargando...</p>
      </div>
    </div>
  )
}
