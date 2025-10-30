import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎使用计时器应用</h1>
        <p className="text-xl text-gray-600 mb-6">
          这是一个仿苹果手机自带计时器的秒表应用
        </p>
        
        <div className="space-y-4">
          <Link to="/timer">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              打开计时器
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500">
            提示：此计时器可自适应宽高，适合在iframe中嵌入使用
          </div>
        </div>
      </Card>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;