import api from "./api/index.js";
import Nodes from "./Components/Nodes.js";
import ImageViewer from "./Components/ImageViewer.js";
import BreadCrumb from "./Components/BreadCrumb.js";
import Loading from "./Components/Loading.js";
import cache from "./utils/cache.js";
import { ERROR_MESSAGE } from "./utils/constants.js";

const dataCache = new cache();

function App() {
  this.state = {
    history: [{ name: "root", id: "" }],
    breadCrumbs: [{ name: "root", id: "" }],
    currentDirName: "root",
    currentDirId: "",
    currentDatas: [],
    currentImagePath: "",
    isModalOpen: false,
    isLoading: true,
  };

  this.init = async () => {
    try {
      const initialData = await api.getRootData();
      dataCache.set("root", initialData);
      this.state.currentDatas = initialData;
      this.NodesComponent = new Nodes({
        initialState: this.state,
        onClickNode: this.onClickNode,
        onOpenImageViewer: this.onOpenImageViewer,
        onHistoryBack: this.onHistoryBack,
      });

      this.ImageViewerComponent = new ImageViewer({
        initialState: this.state,
        onCloseModal: this.onCloseModal,
      });

      this.BreadCrumbComponent = new BreadCrumb({
        initialState: this.state,
        onMove: this.onMoveBreadCrumb,
      });
      this.LoadingComponent = new Loading({ initialState: this.state });
      this.setState({ ...this.state, isLoading: false });
    } catch (error) {
      alert(ERROR_MESSAGE);
    }
  };

  this.onClickNode = async (name, id = "") => {
    try {
      this.setState({ ...this.state, isLoading: true });
      let data;
      if (dataCache.has(name + id)) {
        data = dataCache.get(name + id);
      } else {
        data = await api.getDirectoryData(id);
        dataCache.set(name + id, data);
      }
      const updatedHistory = [...this.state.history, { name, id }];
      const nextState = {
        ...this.state,
        history: updatedHistory,
        currentDirName: name,
        currentDirId: id,
        currentDatas: data,
        isLoading: false,
      };
      this.setState(nextState);
    } catch (error) {
      alert(ERROR_MESSAGE);
    }
  };

  this.onHistoryBack = async () => {
    try {
      if (this.state.history.length < 2) return;
      this.setState({ ...this.state, isLoading: true });
      const updatedHistory = this.state.history.slice(0, -1);
      const { id, name } = updatedHistory[updatedHistory.length - 1];
      let prevData;
      if (dataCache.has(name + id)) {
        prevData = dataCache.get(name + id);
      } else {
        prevData = await api.getDirectoryData(id);
        dataCache.set(name + id, prevData);
      }
      const nextState = {
        ...this.state,
        currentDirId: id,
        currentDirName: name,
        currentDatas: prevData,
        history: updatedHistory,
        isLoading: false,
      };
      this.setState(nextState);
    } catch (error) {
      alert(ERROR_MESSAGE);
    }
  };

  this.onOpenImageViewer = (path) => {
    const nextState = {
      ...this.state,
      isModalOpen: true,
      currentImagePath: path,
    };
    this.setState(nextState);
  };

  this.onCloseModal = () => {
    const nextState = {
      ...this.state,
      isModalOpen: false,
    };
    this.setState(nextState);
  };

  this.onMoveBreadCrumb = async (name, id = "") => {
    try {
      this.setState({ ...this.state, isLoading: true });
      let newData;
      if (dataCache.has(name + id)) {
        newData = dataCache.get(name + id);
      } else {
        newData = await api.getDirectoryData(id);
        dataCache.set(name + id, newData);
      }
      const lastIndex =
        this.state.history.findIndex((value) => value.id === id) + 1;
      const updatedBreadHistory = this.state.history.slice(0, lastIndex);
      const nextState = {
        ...this.state,
        currentDirName: name,
        currentDirId: id,
        currentDatas: newData,
        history: updatedBreadHistory,
        isLoading: false,
      };
      this.setState(nextState);
    } catch (error) {
      alert(ERROR_MESSAGE);
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.NodesComponent.setState(nextState);
    this.ImageViewerComponent.setState(nextState);
    this.BreadCrumbComponent.setState(nextState);
    this.LoadingComponent.setState(nextState);
  };

  this.init();
}

export default App;
