import { useState } from 'react';
import CopyButton from './components/CopyButton';
import './App.css';

function App() {
    const [columns, setColumns] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setColumns([...columns, event.currentTarget.attribute.value]);
        event.currentTarget.reset();
        event.currentTarget.focus();
    }

    const copyToClipboard = (event) => {
        const targetContent = event.currentTarget.parentElement.querySelector('pre').textContent;
        copyText(targetContent);
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setSuccess(true)
                setInterval(() => {
                    setSuccess(false);
                }, 5000)
            })
            .catch(err => console.log('error: ', err))
    }

    return (
        <div className='flex flex-col justify-center max-w-6xl mx-auto'>
            <h3 className='text-3xl font-semibold my-8 text-center'>Laravel model generator</h3>
            {
                success &&
                <div className="my-2 py-2 px-3 rounded bg-green-100 text-green-500 border border-green-400">
                    Text copied to clipboard
                </div>
            }
            <div className='flex space-x-2 mx-auto'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='enter model attribut...' name='attribute' className='w-lg border gray-50 px-3 py-2 rounded' />
                </form>
                <button onClick={() => setColumns([])} className='px-4 py-2 rounded bg-blue-700 text-gray-50 border-2 border-blue-800'>clear attributes</button>
            </div>
            <div className='grid grid-cols-12 gap-4 mt-12'>
                <div className='bg-gray-100 rounded p-4 col-span-6'>
                    <h4 className='font-semibold text-gray-800'>Migration</h4>
                    <pre className='border-l border-l-4 p-2 mt-2 border-gray-600 bg-white'>
                        {
                            columns.length > 0 &&
                            columns.map((col, index) => (<p key={index}>{`$table->string('${col}');`}</p>))
                        }
                    </pre>
                    <CopyButton handleClick={copyToClipboard} />
                </div>
                <div className='bg-gray-100 rounded p-4 col-span-6'>
                    <h4 className='font-semibold text-gray-800'>Model attributes</h4>
                    <pre className='border-l border-l-4 p-2 mt-2 border-gray-600 bg-white'>
                        {
                            columns.length > 0 &&
                            columns.map((col, index) => (<p key={index}>{`public $${col};`}</p>))
                        }
                    </pre>
                    <CopyButton handleClick={copyToClipboard} />
                </div>
                <div className='bg-gray-100 rounded p-4 col-span-6' id='model-attributes'>
                    <h4 className='font-semibold text-gray-800'>Rules</h4>
                    <pre className='border-l border-l-4 p-2 mt-2 border-gray-600 bg-white'>
                        {
                            columns.length > 0 &&
                            columns.map((col, index) => (<p key={index}>{`'${col}' => 'required|string',`}</p>))
                        }
                    </pre>
                    <CopyButton handleClick={copyToClipboard} />
                </div>
                <div className='bg-gray-100 rounded p-4 col-span-6' id='model-attributes'>
                    <h4 className='font-semibold text-gray-800'>loadData()</h4>
                    <pre className='border-l border-l-4 p-2 mt-2 border-gray-600 bg-white'>
                        {
                            columns.length > 0 &&
                            columns.map((col, index) => (<p key={index}>{`$this->${col} = $model->${col};`}</p>))
                        }
                    </pre>
                    <CopyButton handleClick={copyToClipboard} />
                </div>
                <div className='bg-gray-100 rounded p-4 col-span-6' id='model-attributes'>
                    <h4 className='font-semibold text-gray-800'>modelData()</h4>
                    <pre className='border-l border-l-4 p-2 mt-2 border-gray-600 bg-white'>
                        {
                            columns.length > 0 &&
                            columns.map((col, index) => (<p key={index}>{`'${col}' => $this->${col},`}</p>))
                        }
                    </pre>
                    <CopyButton handleClick={copyToClipboard} />
                </div>
            </div>
        </div>
    );
}

export default App;
