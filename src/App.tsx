import Canvas from "@/components/Canvas/Canvas";
import Controls from "@/components/Controls/Controls";
import "./App.css";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 左侧控制面板 */}
      <div className="w-[350px] flex-shrink-0">
        <Controls />
      </div>
      
      {/* 右侧画布区域 */}
      <div className="flex-1">
        <Canvas />
      </div>
    </div>
  );
}

export default App;
