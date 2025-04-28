import { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Icon } from '@iconify/react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayerModal = ({ video }: { video: { topic: string; link: string } }) => {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        color={'primary'}
        className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <Icon icon={'solar:chat-round-video-bold'} height={30} /> {video.topic}
      </Button>
      <Modal show={openModal} size="4xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <div className="flex flex-row h-[70vh] rounded-lg overflow-hidden">
              <ReactPlayer url={`${video.link}`} controls={true} width={'100%'} height={'100%'} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">
              {video.topic}
            </h3>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default VideoPlayerModal;
