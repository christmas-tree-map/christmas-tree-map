import type { Meta, StoryObj } from '@storybook/react';
import useModal from '@/hooks/_common/useModal';
import Modal from './Modal';

const meta = {
  title: 'Common/Modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

if (!document.getElementById('modal')) {
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal';
  // 스토리북 내에서의 위치 지정
  modalDiv.style.position = 'fixed';
  document.body.appendChild(modalDiv);
}

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isModalOpen, closeModal } = useModal(true);

    return (
      <Modal isOpen={isModalOpen} onClose={closeModal} backgroundColor="red">
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2>모달 내용</h2>
          <p>이것은 모달 레이아웃 예시입니다.</p>
        </div>
      </Modal>
    );
  },
};
