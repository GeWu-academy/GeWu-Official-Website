import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>格物官方网站</CardTitle>
          <CardDescription>
            shadcn/ui 组件库已成功引入并配置完成。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            现在可以通过 shadcn 命令行自由添加更多所需组件（如 Dialog、Dropdown、Tabs 等）。
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">了解更多</Button>
          <Button>立即开始</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

