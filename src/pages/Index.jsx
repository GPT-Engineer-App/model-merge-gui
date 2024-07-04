import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Index = () => {
  const [mergeResult, setMergeResult] = useState("");
  const [trainResult, setTrainResult] = useState("");
  const [quantizeResult, setQuantizeResult] = useState("");
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");

  const handleMergeModels = async () => {
    try {
      const response = await fetch("/api/merge-models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model1, model2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to merge models");
      }

      const data = await response.json();
      setMergeResult(data.result);
      toast.success("Models merged successfully!");
    } catch (error) {
      console.error("Error merging models:", error);
      toast.error("Error merging models");
    }
  };

  const handleTrainModel = () => {
    // Implement train model logic here
    setTrainResult("Training logs...");
  };

  const handleQuantizeModel = () => {
    // Implement quantize model logic here
    setQuantizeResult("Quantization logs...");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hugging Face Model Management</h1>
      <Tabs defaultValue="merge">
        <TabsList>
          <TabsTrigger value="merge">Merge Models</TabsTrigger>
          <TabsTrigger value="train">Train Model</TabsTrigger>
          <TabsTrigger value="quantize">Quantize Model</TabsTrigger>
        </TabsList>
        <TabsContent value="merge">
          <div className="space-y-4">
            <Input placeholder="Model 1 URL or ID" value={model1} onChange={(e) => setModel1(e.target.value)} />
            <Input placeholder="Model 2 URL or ID" value={model2} onChange={(e) => setModel2(e.target.value)} />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select attribute or weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attribute">Attribute</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleMergeModels}>Merge Models</Button>
            <Textarea value={mergeResult} readOnly placeholder="Merge result..." />
            <Button>Save Merged Model</Button>
          </div>
        </TabsContent>
        <TabsContent value="train">
          <div className="space-y-4">
            <Input placeholder="Dataset URL or ID" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select model architecture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="architecture1">Architecture 1</SelectItem>
                <SelectItem value="architecture2">Architecture 2</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleTrainModel}>Train Model</Button>
            <Textarea value={trainResult} readOnly placeholder="Training logs..." />
            <Button>Save Trained Model</Button>
          </div>
        </TabsContent>
        <TabsContent value="quantize">
          <div className="space-y-4">
            <Input placeholder="Model URL or ID" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select quantization parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parameter1">Parameter 1</SelectItem>
                <SelectItem value="parameter2">Parameter 2</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleQuantizeModel}>Quantize Model</Button>
            <Textarea value={quantizeResult} readOnly placeholder="Quantization logs..." />
            <Button>Save Quantized Model</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;